import Joi from "joi";

export const addBookSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  author: Joi.string().min(3).max(100).required(),
  isbn: Joi.string().alphanum().length(13).required(),
  availableQuantity: Joi.number().integer().min(0).required(),
  shelfLocation: Joi.string().min(1).max(50).required(),
});

export const updateBookSchema = Joi.object({
  id: Joi.number().integer().required(),
  title: Joi.string().min(3).max(100),
  author: Joi.string().min(3).max(100),
  isbn: Joi.string().alphanum().length(13),
  availableQuantity: Joi.number().integer().min(0),
  shelfLocation: Joi.string().min(1).max(50),
}).min(2);

export const searchBookSchema = Joi.object({
  title: Joi.string().min(1).max(100),
  author: Joi.string().min(1).max(100),
  isbn: Joi.string().alphanum().length(13),
});

export const deleteBookSchema = Joi.object({
  id: Joi.number().integer().required(),
});
