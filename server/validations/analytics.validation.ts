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
    throw new ApiError(
      HttpStatusCodes.BAD_REQUEST,
      "Start date is not a valid date"
    );
  }

  if (endDate && !isDate(new Date(endDate as string))) {
    throw new ApiError(
      HttpStatusCodes.BAD_REQUEST,
      "End date is not a valid date"
    );
  }
  const start = new Date(startDate as string);

  const end = new Date(endDate as string);
  // assume that they're at the start of the day
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  if (isFuture(start) || isFuture(end)) {
    throw new ApiError(
      HttpStatusCodes.BAD_REQUEST,
      "Dates cannot be in the future."
    );
  }
  if (isDate(start) && isDate(end) && isAfter(start, end)) {
    throw new ApiError(
      HttpStatusCodes.BAD_REQUEST,
      "The start date cannot be after the end date."
    );
  }

  next();
};
