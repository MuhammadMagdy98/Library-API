import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import {
  addBookService,
  getAllBooksService,
  deleteBookService,
} from "../services/book.service";

export const addBookController = catchAsync(
  async (req: Request, res: Response) => {
    const book = await addBookService(req.body);

    res.status(201).json({
      message: "Book added successfully",
      data: book,
    });
  }
);

export const getAllBooksController = catchAsync(
  async (req: Request, res: Response) => {
    const books = await getAllBooksService();

    res.status(200).json({
      message: "List of books retrieved successfully",
      data: books,
    });
  }
);

export const deleteBookController = catchAsync(
  async (req: Request, res: Response) => {
    await deleteBookService(Number(req.params.id));
    res.status(200).json({ message: "Book is deleted successfully" });
  }
);
