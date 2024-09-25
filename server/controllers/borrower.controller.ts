import HttpStatusCode from "http-status-codes";
import { Request, Response } from "express";
import logger from "../config/logger";
import {
  addBorrowerService,
  updateBorrowerService,
  deleteBorrowerService,
  getAllBorrowersService,
} from "../services/borrow.service";
import catchAsync from "../utils/catchAsync";
export const addBorrowerController = catchAsync(
  async (req: Request, res: Response) => {
    logger.info(`Going to add a new borrower with email ${req.body.email}`);
    await addBorrowerService(req.body);
    res
      .status(HttpStatusCode.CREATED)
      .json({ message: "Borrower is added successfully" });
  }
);

export const updateBorrowerController = catchAsync(
  async (req: Request, res: Response) => {
    logger.info(`Going to update a borrower with email ${req.body.email}`);
    await updateBorrowerService(req.body);
    res
      .status(HttpStatusCode.CREATED)
      .json({ message: "Borrower is updated successfully" });
  }
);

export const deleteBorrowerController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    await deleteBorrowerService(Number(id));
    res
      .status(HttpStatusCode.OK)
      .json({ message: "Borrower is deleted successfully" });
  }
);

export const getAllBorrowersController = catchAsync(
  async (req: Request, res: Response) => {
    const borrowers = await getAllBorrowersService();
    res.status(HttpStatusCode.OK).json(borrowers);
  }
);
