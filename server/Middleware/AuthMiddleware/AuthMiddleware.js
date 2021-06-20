import "babel-polyfill";
import { Strategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import jwt from "jsonwebtoken";

class Authorization {
  constructor() {}

  static VerifyUser = async () => {
    const JWTPassport = passport.use(
      new Strategy(
        {
          secretOrKey: process.env.SECRET_KEY,
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        },
        Authorization.jwtStrategyCallback
      )
    );

    return JWTPassport;
  };

  static jwtStrategyCallback = (token, done) => {
    try {
      return done(null, token);
    } catch (error) {
      done(error);
    }
  };

  static typeTwoVerifyUser = (req, res, next) => {
    //get data in the header by first getting the header
    const header = req.headers["authorization"];

    //check if header is undefined
    if (typeof header !== "undefined" && header !== undefined) {
      //get the token by splitting it from the gotten string
      const bearer_token = header.split(" ");

      const token = bearer_token[1];

      //set that token to be part of the request object
      req.token = token;

      try {
        const verify = jwt.verify(req.token, process.env.SECRET_KEY);
        req.user = verify;

        next();
      } catch (error) {
        res.status(403).json({ message: "Invalid token" });
      }
    } else {
      return res.status(401).json({ message: "Access Denied" });
    }
  };
}

export default Authorization;
