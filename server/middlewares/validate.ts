import { Request, Response, NextFunction } from "express";
import Joi, { Schema } from "joi";
import  HttpsStatusCodes from "http-status-codes";


export const validate = (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
    
}