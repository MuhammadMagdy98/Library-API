import Joi from "joi";

export const addBorrowerSchema = Joi.object({
  email: Joi.string().required().email(),
  name: Joi.string().required().min(3).max(100),
  password: Joi.string().required().min(8).max(100),
});

export const updateBorrowerSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().min(3).max(100),
  email: Joi.string().email(),
  password: Joi.string().min(8).max(100),
}).min(2);
