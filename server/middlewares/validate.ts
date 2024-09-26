import { Request, Response, NextFunction } from "express";
import Joi, { Schema } from "joi";
import HttpsStatusCodes from "http-status-codes";

export const validate =
  (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
    let { error } = schema.validate(req.body);
    if (req.params?.id) {
      error = schema.validate(req.params).error;
    } else if (req.query?.title || req.query?.author || req.query?.isbn) {
      // that should be search book
      error = schema.validate(req.query).error;
    }
    if (error) {
      return res
        .status(HttpsStatusCodes.UNPROCESSABLE_ENTITY)
        .json({ message: error.details[0].message });
    }
    next();
  };
