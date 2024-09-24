import Joi from "joi";

export const borrowSchema = Joi.object({
  email: Joi.string().required().email(),
  name: Joi.string().required().min(3).max(100),
});

