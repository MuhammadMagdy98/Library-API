import { Request, Response, NextFunction } from "express";
import HttpStatusCodes from "http-status-codes";
import { verifyToken } from "../utils/jwt.util";
import catchAsync from "../utils/catchAsync";
import ApiError from "../utils/ApiError";
import User from "../model/User";
export const authenticate = catchAsync(
  async (req: any, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new ApiError(
        HttpStatusCodes.UNAUTHORIZED,
        "Access denied, no token provided"
      );
    }

    const decoded: any = verifyToken(token);
    if (!decoded) {
      throw new ApiError(HttpStatusCodes.FORBIDDEN, "Access denied");
    }

    const exists = await User.findByPk(decoded.id);
    if (!exists) {
      throw new ApiError(HttpStatusCodes.FORBIDDEN, "Access denied");
    }
    req.user = { id: decoded.id, role: decoded.role };

    if (decoded && decoded.role !== "admin" && decoded.role !== "borrower") {
      throw new ApiError(HttpStatusCodes.FORBIDDEN, "Access denied");
    }

    next();
  }
);
