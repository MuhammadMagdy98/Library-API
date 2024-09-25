import { Request, Response, NextFunction } from "express";
import HttpStatusCodes from "http-status-codes";
import ApiError from "../utils/ApiError";
import { verifyToken } from "../utils/jwt.util";
import env from "../config/env";
import catchAsync from "../utils/catchAsync";

export const adminAuth = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new ApiError(
        HttpStatusCodes.UNAUTHORIZED.valueOf(),
        "Access denied, no token provided"
      );
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      throw new ApiError(HttpStatusCodes.FORBIDDEN.valueOf(), "Access denied");
    }
    if (decoded && (decoded as any).role !== "admin") {
      throw new ApiError(HttpStatusCodes.FORBIDDEN.valueOf(), "Access denied");
    }

    next();
  }
);
