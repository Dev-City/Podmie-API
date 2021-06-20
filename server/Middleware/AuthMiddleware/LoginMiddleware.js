import "babel-polyfill";
import passport from "passport";
import bcrypt from "bcryptjs";
import { Strategy } from "passport-local";
import AuthSchema from "../../Model/Auth.model";
import AuthValidator from "../../Config/Auth.config";

class LoginMiddleware {
  constructor() {}

  static loginStrategy = async () => {
    const localPassport = passport.use(
      "login-local",
      new Strategy(
        {
          usernameField: "email",
          passwordField: "password",
          passReqToCallback: true,
        },
        LoginMiddleware.localStrategyCallback
      )
    );

    return localPassport;
  };

  static localStrategyCallback = async (req, email, password, done) => {
    //validate field
    const { error } = AuthValidator._loginValidation(req.body);
    if (error) {
      req.authError = error.details[0].message;
      return done(null, false);
    }

    //check if user exist in database
    const user = await AuthSchema.findOne({ "local.email": email });
    if (!user) {
      req.authError = "wrong email entered!";
      return done(null, false);
    }

    //compare password
    const validPass = await bcrypt.compare(password, user.local.password);
    if (!validPass) {
      req.authError = "wrong password entered!";
      return done(null, false);
    }

    return done(null, user);
  };
}

export default LoginMiddleware;
