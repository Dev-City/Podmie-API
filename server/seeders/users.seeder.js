import { Seeder } from "mongoose-data-seed";
import Model from "../model/Auth.model";

const data = [
  {
    email: "user1@gmail.com",
    password: "123123",
    passwordConfirmation: "123123",
    isAdmin: true,
  },
  {
    email: "user2@gmail.com",
    password: "123123",
    passwordConfirmation: "123123",
    isAdmin: false,
  },
];

class UsersSeeder extends Seeder {
  async shouldRun() {
    return Model.countDocuments()
      .exec()
      .then((count) => count === 0);
  }

  async run() {
    return Model.create(data);
  }
}

export default UsersSeeder;
