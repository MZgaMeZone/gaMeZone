import Joi from "joi";

const UserJoiSchema = {
  signUp: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().required(),
    address1: Joi.string().required(),
    address2: Joi.string().required(),
    // postalCode: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    role: Joi.string(),
    status: Joi.number(),
  }),
  login: Joi.object().keys({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().required(),
  }),
  roleChange: Joi.object().keys({
    userId: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    role: Joi.string().required(),
  }),
};
export { UserJoiSchema };
