import { Schema, model } from "mongoose";

const secretCode = new Schema({
  email: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
    expires: 600,
  },
});

export default model("email_secret", secretCode);
