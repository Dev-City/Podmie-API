import { Schema, model } from "mongoose";

const authSchema = new Schema({
  local: {
    name: {
      type: String,
      // required: true,
      min: 6,
      max: 255,
      default: null,
    },
    email: {
      type: String,
      // required: true,
      max: 255,
      min: 6,
      // unique: true,
      default: null,
    },
    password: {
      type: String,
      // required: true,
      min: 6,
      max: 1024,
      default: null,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  // facebook: {
  //   id: String,
  //   token: String,
  //   name: String,
  //   email: String,
  // },
  google: {
    id: String,
    name: String,
  },
});

export default model("auth", authSchema);
