import catchAsync from "../utils/catchAsync";
import { Request, Response } from "express";
import {
  checkoutBookService,
  returnBookService,
  getCurrentBorrowedBooksService,
  getOverdueBooksService,
} from "../services/borrowing.service";
import HttpStatusCodes from "http-status-codes";

export const checkoutBookController = catchAsync(
  async (req: any, res: Response) => {
    const { bookId, dueDate } = req.body;
    const userId = req.user.id;

    const result = await checkoutBookService({
      bookId,
      borrowerId: userId,
      dueDate,
    });

    res.status(HttpStatusCodes.OK).json({
      message: "Book checked out successfully",
      data: result,
    });
  }
);

export const returnBookController = catchAsync(
  async (req: any, res: Response) => {
    const { bookId } = req.body;
    const userId = req.user.id;

    const result = await returnBookService({
      borrowerId: userId,
      bookId: bookId,
    });

    res.status(HttpStatusCodes.OK).json({
      message: "Book returned successfully",
      data: result,
    });
  }
);

export const getCurrentBorrowedBooksController = catchAsync(
  async (req: any, res: Response) => {
    const userId = req.user.id;

    const borrowedBooks = await getCurrentBorrowedBooksService({
      borrowerId: userId,
    });

    res.status(HttpStatusCodes.OK).json({
      message: "Currently borrowed books retrieved successfully",
      data: borrowedBooks,
    });
  }
);

export const getOverdueBooksController = catchAsync(
  async (req: any, res: Response) => {
    const userId = req.user.id;

    const overdueBooks = await getOverdueBooksService({ borrowerId: userId });

    res.status(HttpStatusCodes.OK).json({
      message: "Overdue books retrieved successfully",
      data: overdueBooks,
    });
  }
);
