import "babel-polyfill";
import passport from "passport";
import bcrypt from "bcryptjs";
import { Strategy } from "passport-local";
import AuthSchema from "../../Model/Auth.model";
import CodeSchema from "../../Model/SecretCode.model";

class RegisterMiddleware {
  constructor() {}

  static singupStrategy = async () => {
    const localPassport = passport.use(
      "signup-local",
      new Strategy(
        {
          usernameField: "email",
          passwordField: "password",
          passReqToCallback: true,
        },
        RegisterMiddleware.localStrategyCallback
      )
    );

    return localPassport;
  };

  static localStrategyCallback = async (req, email, password, done) => {
    // check if email already exists
    const emailExist = await AuthSchema.exists({
      "local.email": email,
    });
    if (emailExist) {
      req.authError = "Email already taken";
      return done(null, false);
    }
    //hash the password before adding to database
    const saltedPassword = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, saltedPassword);
    //add new users to database
    const addUser = new AuthSchema({
      local: {
        name: req.body.name,
        email,
        password: hashedPassword,
      },
    });
    // create code and save
    const createCode = new CodeSchema({
      email,
      code: bcrypt.hashSync(email, bcrypt.genSaltSync(10)),
    });
    try {
      const savedUser = await addUser.save();
      const savedCode = await createCode.save();
      return done(null, [savedUser, savedCode]);
    } catch (error) {
      done(error);
    }
  };
}

export default RegisterMiddleware;
