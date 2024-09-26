import Joi from "joi";

export const checkoutBookSchema = Joi.object({
  bookId: Joi.number().integer().required(),
  dueDate: Joi.date().required(),
});

export const returnBookSchema = Joi.object({
  bookId: Joi.number().integer().required(),
});


