import Joi from "joi";

export const bookSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  author: Joi.string().min(3).max(100).required(),
  ISBN: Joi.string().alphanum().length(13).required(),
  availableQuantity: Joi.number().integer().min(0).required(),
  shelfLocation: Joi.string().min(1).max(50).required(),
});

export const updateBookSchema = Joi.object({
  title: Joi.string().min(3).max(100),
  author: Joi.string().min(3).max(100),
  ISBN: Joi.string().alphanum().length(13),
  availableQuantity: Joi.number().integer().min(0),
  shelfLocation: Joi.string().min(1).max(50),
}).min(1);

export const searchBookSchema = Joi.object({
  title: Joi.string().min(1).max(100),
  author: Joi.string().min(1).max(100),
  ISBN: Joi.string().alphanum().length(13),
});
