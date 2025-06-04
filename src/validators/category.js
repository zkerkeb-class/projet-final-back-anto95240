import Joi from "joi";

export const categorySchema = Joi.object({
  name: Joi.string().min(2).max(50).optional(),
  theme: Joi.string().min(2).max(50).optional(),
  color: Joi.string().pattern(/^#([0-9a-fA-F]{6})$/).optional()
});
