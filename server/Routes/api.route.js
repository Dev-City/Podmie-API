import "babel-polyfill";
import { Router } from "express";

const route = Router();

route.get("/profile", async (req, res, next) => {
  res
    .status(200)
    .json({ message: "welcome", user: req.user, token: req.headers });
});

export default route;
