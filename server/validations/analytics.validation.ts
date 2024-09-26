import { isFuture, isAfter, isDate } from "date-fns";
import ApiError from "../utils/ApiError";
import HttpStatusCodes from "http-status-codes";
import { Request, Response, NextFunction } from "express";
export const validateDateRange = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { startDate, endDate } = req.query;

  if (startDate && !isDate(new Date(startDate as string))) {
    return next(
      new ApiError(
        HttpStatusCodes.BAD_REQUEST,
        "Start date is not a valid date"
      )
    );
  }

  if (endDate && !isDate(new Date(endDate as string))) {
    return next(
      new ApiError(HttpStatusCodes.BAD_REQUEST, "End date is not a valid date")
    );
  }

  const start = new Date(startDate as string);
  const end = new Date(endDate as string);

  if (isFuture(start) || isFuture(end)) {
    return next(
      new ApiError(
        HttpStatusCodes.BAD_REQUEST,
        "Dates cannot be in the future."
      )
    );
  }

  if (isAfter(start, end)) {
    return next(
      new ApiError(
        HttpStatusCodes.BAD_REQUEST,
        "The start date cannot be after the end date."
      )
    );
  }

  next();
};
