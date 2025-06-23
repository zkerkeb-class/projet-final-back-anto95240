import Joi from "joi";

export const transactionSchema = Joi.object({
  date: Joi.date().required(),
  paiement: Joi.string().required(),
  beneficiaire: Joi.string().required(),
  categoryId: Joi.string().required(),
  description: Joi.string().required(),
  type: Joi.string().valid("debit", "credit").required(),
  amount: Joi.number().precision(2).min(0).required(),
  accountId: Joi.string().required(),
  userId: Joi.string().required(),
});

export const updateTransactionSchema = Joi.object({
  date: Joi.date().optional(),
  paiement: Joi.string().optional(),
  beneficiaire: Joi.string().optional(),
  categoryId: Joi.string().optional(),
  description: Joi.string().optional(),
  type: Joi.string().valid("debit", "credit").optional(),
  amount: Joi.number().precision(2).min(0).optional(),
  accountId: Joi.string().optional(),
  userId: Joi.string().optional(),
});
