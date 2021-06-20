import "babel-polyfill";
import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import AuthSchema from "../../Model/Auth.model";

class GoogleAuthMiddleware {
  constructor() {}

  googleStrategy = async () => {
    const googlePassport = passport.use(
      new Strategy(
        {
          clientID: process.env.GOOGLE_CLIENTID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: process.env.GOOGLE_CALLBACK,
        },
        this.VerifyCallback
      )
    );

    return googlePassport;
  };

  VerifyCallback = async (accessToken, refreshToken, profile, done) => {
    process.nextTick(async () => {
      const user = await AuthSchema.findOne({
        "google.id": profile.id,
      });
      if (user) return done(null, user);
      const addUser = new AuthSchema({
        google: {
          id: profile.id,
          name: profile.displayName,
        },
      });
      try {
        const savedUser = await addUser.save();
        return done(null, savedUser);
      } catch (error) {
        done(error);
      }
    });

    // console.log(profile);
  };
}

export default GoogleAuthMiddleware;
