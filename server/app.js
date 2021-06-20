import express from "express";
import { Server } from "http";
import mongoose from "mongoose";
import passport from "passport";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route";
import apiRoute from "./routes/api.route";
import RegisterMiddleware from "./Middleware/AuthMiddleware/RegisterMiddleware";
import LoginMiddleware from "./Middleware/AuthMiddleware/LoginMiddleware";
import AuthMiddleware from "./Middleware/AuthMiddleware/AuthMiddleware";
import OAuthMiddleware from "./Middleware/OAuthMiddleware/GoogleAuthMiddleware";

// initialize app here
const app = express();
const http = Server(app);
const PORT = process.env.PORT || 5000;
dotenv.config();

//call passport middlewares here
RegisterMiddleware.singupStrategy();
LoginMiddleware.loginStrategy();
AuthMiddleware.VerifyUser();
new OAuthMiddleware().googleStrategy;

// connect mongoose to app
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.error(error));
const con = mongoose.connection;
con.once("open", () => console.log("connection is opened"));
con.on("error", (err) => console.error(err));

/** set app middleware */
app.use(cors());
app.use(express.urlencoded({ extended: true })); //for application/x-www-form-urlencoded
app.use(express.json()); //for application/json

//route middleware
app.use("/api/auth", authRoute);
app.use("/api", passport.authenticate("jwt", { session: false }), apiRoute);

const server = http.listen(PORT, () => {
  console.log(`app started on port ${server.address().port}`);
});
