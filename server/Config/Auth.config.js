import "babel-polyfill";
import Joi from "joi";

class AuthValidation {
  static _registerValidation = (data) => {
    const schema = Joi.object({
      name: Joi.string().min(6).required(),
      email: Joi.string().email().min(6).required(),
      password: Joi.string().min(6).required(),
    });

    return schema.validate(data);
  };

  static _loginValidation = (data) => {
    const schema = Joi.object({
      email: Joi.string().min(6).required().email(),
      password: Joi.string().min(6).required(),
    });

    return schema.validate(data);
  };
}

export default AuthValidation;
