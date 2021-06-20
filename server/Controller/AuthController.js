import "babel-polyfill";
import BaseController from "./BaseController";
import AuthValidator from "../Config/Auth.config";
import passport from "passport";
import jwt from "jsonwebtoken";
import VerificationMail from "../Mail/VerificationMail";

class AuthController extends BaseController {
  constructor(req, res) {
    super(req, res);
    this.req = req;
    this.res = res;
  }

  static _loginUser = async (req, res, next) => {
    const { error } = AuthValidator._loginValidation(req.body);
    if (error)
      return res.status(401).json({ error_msg: error.details[0].message });

    const userLogin = passport.authenticate(
      "login-local",
      {
        failWithError: true,
      },
      async (err, user, info) => {
        try {
          if (req.authError) {
            return res.status(400).json({ message: req.authError });
          }

          await req.login(user, { session: false });
          const body = { _id: user._id, email: user.local.email };
          const token = jwt.sign({ user: body }, process.env.SECRET_KEY, {
            expiresIn: "60s",
          });
          return res.json({ token });
        } catch (error) {
          // return next(error);
        }
      }
    );

    return userLogin(req, res, next);
  };

  static _registerUser = async (req, res, next) => {
    //validate field before authenticating
    const { error } = AuthValidator._registerValidation(req.body);
    if (error)
      return res.status(401).json({ error_msg: error.details[0].message });

    const userRegister = passport.authenticate(
      "signup-local",
      {
        failWithError: true,
      },
      async (err, data, info) => {
        try {
          if (req.authError) {
            return res.status(400).json({ message: req.authError });
          }

          let user = data[0];
          await req.login(user, { session: false });

          // send verification mail to user email
          user = { ...user.local, redirect_link: "/dashboard" };
          if (user) {
            const email_data = {
              code: data[1].code,
              email: data[1].email,
            };
            const sendMail = new VerificationMail();
            sendMail.SendMail(user.email, email_data);
          }

          return res
            .status(200)
            .json({ message: "successfully added user", data: { user } });
        } catch (error) {
          // return next(error);
        }
      }
    );

    return userRegister(req, res, next);
  };
}

export default AuthController;
