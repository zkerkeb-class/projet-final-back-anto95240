import Joi from "joi";

export const accountSchema = Joi.object({
  name: Joi.string(),
  type: Joi.string(),
  balance: Joi.number().min(0).precision(2).optional(),
  budgetStart: Joi.number().min(0).required(),
});

export const updateAccountSchema = Joi.object({
  name: Joi.string().optional(),
  type: Joi.string().optional(),
  balance: Joi.number().min(0).precision(2).optional(),
  budgetStart: Joi.number().min(0).optional(),
});
