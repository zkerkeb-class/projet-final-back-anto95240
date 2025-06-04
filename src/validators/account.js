import Joi from "joi";

export const accountSchema = Joi.object({
  name: Joi.string().required(),
  type: Joi.string(),
  balance: Joi.number().min(0).precision(2).optional(),
  budgetStart: Joi.number().min(0).required(),
  taux: Joi.when("type", {
    is: Joi.valid('Épargne', 'Investissement'),
    then: Joi.number().min(0).required(),
    otherwise: Joi.forbidden(),
  }),
});

export const updateAccountSchema = Joi.object({
  name: Joi.string().optional(),
  type: Joi.string().optional(),
  balance: Joi.number().min(0).precision(2).optional(),
  budgetStart: Joi.number().min(0).optional(),
  taux: Joi.when("type", {
    is: Joi.valid('Épargne', 'Investissement'),
    then: Joi.number().min(0).optional(),
    otherwise: Joi.forbidden(),
  }),
});
