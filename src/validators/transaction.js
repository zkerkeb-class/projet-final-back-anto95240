import Joi from "joi";

export const transactionSchema = Joi.object({
  date: Joi.date().required(),
  paiement: Joi.string().required(),
  beneficiare: Joi.string().required(),
  categoryId: Joi.string().required(), // 👈 corrigé ici
  description: Joi.string().required(),
  type: Joi.string().valid("debit", "credit").required(),
  amount: Joi.number().precision(2).min(0).required(),
  accountId: Joi.string().required(), // 👈 à ajouter si tu l’envoies depuis le frontend
  userId: Joi.string().required(), // 👈 à ajouter aussi si présent dans les données
});

export const updateTransactionSchema = Joi.object({
  date: Joi.date().optional(),
  paiement: Joi.string().optional(),
  beneficiare: Joi.string().optional(),
  categoryId: Joi.string().optional(), // 👈 corrigé ici aussi
  description: Joi.string().optional(),
  type: Joi.string().valid("debit", "credit").optional(),
  amount: Joi.number().precision(2).min(0).optional(),
  accountId: Joi.string().optional(),
  userId: Joi.string().optional(),
});
