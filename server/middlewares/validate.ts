import { Request, Response, NextFunction } from "express";
import Joi, { Schema } from "joi";
import HttpsStatusCodes from "http-status-codes";

export const validate =
  (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
    let { error } = schema.validate(req.body);
    if (req.params?.id) {
      error = schema.validate(req.params).error;
    }
    if (error) {
      return res
        .status(HttpsStatusCodes.UNPROCESSABLE_ENTITY)
        .json({ message: error.details[0].message });
    }
    next();
  };
