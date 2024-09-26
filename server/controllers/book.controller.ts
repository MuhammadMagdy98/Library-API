import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import {
  addBookService,
  getAllBooksService,
  deleteBookService,
  updateBookService,
  searchBooksService,
} from "../services/book.service";
import HttpStatusCodes from "http-status-codes";

export const addBookController = catchAsync(
  async (req: Request, res: Response) => {
    const book = await addBookService(req.body);

    res.status(HttpStatusCodes.CREATED).json({
      message: "Book added successfully",
      data: book,
    });
  }
);

export const updateBookController = catchAsync(
  async (req: Request, res: Response) => {
    const updatedBook = await updateBookService(req.body);

    res.status(HttpStatusCodes.OK).json({
      message: "Book updated successfully",
      data: updatedBook,
    });
  }
);

export const getAllBooksController = catchAsync(
  async (req: Request, res: Response) => {
    const books = await getAllBooksService();

    res.status(HttpStatusCodes.OK).json({
      message: "List of books retrieved successfully",
      data: books,
    });
  }
);

export const searchBooksController = catchAsync(
  async (req: Request, res: Response) => {
    const books = await searchBooksService(req.query);

    res.status(HttpStatusCodes.OK).json({
      message: "Books found",
      data: books,
    });
  }
);

export const deleteBookController = catchAsync(
  async (req: Request, res: Response) => {
    await deleteBookService(Number(req.params.id));
    res
      .status(HttpStatusCodes.OK)
      .json({ message: "Book is deleted successfully" });
  }
);
