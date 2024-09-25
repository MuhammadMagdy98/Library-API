import HttpStatusCode from "http-status-codes";
import { Request, Response } from "express";
import logger from "../config/logger";
import { loginService } from "../services/auth.service";
import catchAsync from "../utils/catchAsync";
import { generateToken } from "../utils/jwt.util";
export const loginController = catchAsync(
  async (req: Request, res: Response) => {
    logger.info(`Going to add a new borrower with email ${req.body.email}`);
    const user = await loginService(req.body);
    const token = generateToken({ id: user.id, role: user.role });
    res
      .status(HttpStatusCode.OK)
      .json({ token, message: "Login is successful" });
  }
);
