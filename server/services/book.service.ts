import Book from "../model/Book";
import { BookAttributes } from "../types/types";
import HttpStatusCode from "http-status-codes";
import ApiError from "../utils/ApiError";

export const addBookService = async (bookDetails: BookAttributes) => {
  const book = await Book.create({
    title: bookDetails.title,
    author: bookDetails.author,
    isbn: bookDetails.isbn,
    availableQuantity: bookDetails.availableQuantity,
    shelfLocation: bookDetails.shelfLocation,
  });

  return book;
};

export const getAllBooksService = async () => {
  const books = await Book.findAll();

  return books;
};

export const deleteBookService = async (id: number) => {
  const book = await Book.findByPk(id);

  if (!book) {
    throw new ApiError(HttpStatusCode.NOT_FOUND, "Book not found");
  }

  await book.destroy();
};
