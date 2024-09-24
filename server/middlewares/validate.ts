import { Request, Response, NextFunction } from "express";
import Joi, { Schema } from "joi";
import HttpsStatusCodes from "http-status-codes";

export const validate =
  (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res
        .status(HttpsStatusCodes.UNPROCESSABLE_ENTITY)
        .json({ message: error.details[0].message });
    }
    next();
  };
