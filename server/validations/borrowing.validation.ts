import Joi from "joi";

export const checkoutBookSchema = Joi.object({
  bookId: Joi.number().integer().required(),
  dueDate: Joi.date().greater("now").iso().required(),
});

export const returnBookSchema = Joi.object({
  bookId: Joi.number().integer().required(),
});
