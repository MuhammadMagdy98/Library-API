import HttpStatusCode from "http-status-codes";
import { Request, Response } from "express";
import logger from "../config/logger";
import { addBorrowerService } from "../services/borrow.service";
import { generateToken } from "../utils/jwt.util";
import catchAsync from "../utils/catchAsync";
export const addBorrowerController = catchAsync(
  async (req: Request, res: Response) => {
    logger.info(`Going to add a new borrower with email ${req.body.email}`);
      const borrower = await addBorrowerService(req.body);
      const token = generateToken({ id: borrower.id });
      res
        .status(HttpStatusCode.CREATED)
        .json({ token, message: "Borrower is added successfully" });
  }
);
