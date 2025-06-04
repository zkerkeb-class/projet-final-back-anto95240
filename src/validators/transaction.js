import Joi from "joi";

export const transactionSchema = Joi.object({
  date: Joi.date().required(),
  paiement: Joi.string().required(),
  beneficiare: Joi.string().required(),
  categoryName: Joi.string().required(),
  description: Joi.string().required(),
  type: Joi.string().valid("debit", "credit").required(),
  amount: Joi.number().precision(2).min(0).required(),
});

export const updateTransactionSchema = Joi.object({
  date: Joi.date().optional(),
  paiement: Joi.string().optional(),
  beneficiare: Joi.string().optional(),
  categoryName: Joi.string().optional(),
  description: Joi.string().optional(),
  type: Joi.string().valid("debit", "credit").optional(),
  amount: Joi.number().precision(2).min(0).optional(),
});