import Joi from "joi";

// export const signUpSchema = Joi.object({
//   firstname: Joi.string().required(),
//   lastname: Joi.string().required(),
//   username: Joi.string().required(),
//   email: Joi.string().email().required(),
//   password: Joi.string().min(6).required(),
//   confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
// });

export const userSignUpSchema = Joi.object({
  firstname: Joi.string().trim().min(2).max(50).required(),
  lastname: Joi.string().trim().min(2).max(50).required(),
  username: Joi.string().trim().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  passwordConfirm: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Les mots de passe ne correspondent pas.'
  }),
  accountName: Joi.string().required(),
  budgetStart: Joi.number().min(0).required(),
});

export const loginSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required(),
});

export const updateUserSchema = Joi.object({
  firstname: Joi.string(),
  lastname: Joi.string(),
  username: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string().min(6),
  passwordConfirm: Joi.string().valid(Joi.ref("password")).when("password", {
    is: Joi.exist(),
    then: Joi.required(),
    otherwise: Joi.forbidden()
  }),
  image: Joi.string().allow("")
});
