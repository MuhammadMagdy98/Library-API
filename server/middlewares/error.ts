import { Request, Response, NextFunction } from "express";
import HttpStatusCodes from "http-status-codes";
import sequelize from "sequelize";
import ApiError from "../utils/ApiError";
import logger from "../config/logger";
import env from "../config/env";
import { JsonWebTokenError } from "jsonwebtoken";

// convert the errors thrown by other libraries to a more readable error
export const errorConverter = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = err;
  logger.info(err);
  if (!(error instanceof ApiError)) {
    if (error instanceof sequelize.UniqueConstraintError) {
      const fieldName = error.errors?.[0]?.path || "field";
      const errorMessage = `${fieldName} already exists`;
      error = new ApiError(HttpStatusCodes.CONFLICT, errorMessage);
    } else if (error instanceof JsonWebTokenError) {
      error = new ApiError(HttpStatusCodes.FORBIDDEN, "Invalid token");
    } else {
      error = new ApiError(
        HttpStatusCodes.INTERNAL_SERVER_ERROR,
        "Interval server error"
      );
    }
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

  res.status(statusCode).send(response);
};
