import { Request, Response, NextFunction } from "express";
import HttpStatusCodes from "http-status-codes";
import sequelize from "sequelize";
import ApiError from "../utils/ApiError";
import logger from "../config/logger";
import env from "../config/env";

export const errorConverter = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = err;
  logger.info(err);
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode ||
      (error instanceof sequelize.Error
        ? HttpStatusCodes.BAD_REQUEST
        : HttpStatusCodes.INTERNAL_SERVER_ERROR);
    const message = error.message || statusCode;
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

export const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { statusCode, message } = err;

  if (env.NODE_ENV === "production" && !err.isOperational) {
    statusCode = HttpStatusCodes.INTERNAL_SERVER_ERROR;
    message = "Internal Server Error";
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
  };

  logger.error(err);

  res.status(statusCode).send(response);
};
