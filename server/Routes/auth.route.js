import { Router } from "express";
import "babel-polyfill";
import passport from "passport";
import AuthController from "../controller/AuthController";
import OAuthController from "../controller/OAuthController";

const route = Router();

route.post("/login", AuthController._loginUser);
route.post("/register", AuthController._registerUser);
route.get("/google", passport.authenticate("google", { scope: ["profile"] }));

//callback url to tell google to go to
route.get(
  "/google/redirect",
  passport.authenticate("google"),
  OAuthController.googleAuthentication
);

export default route;
