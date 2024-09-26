import Book from "../model/Book";
import { BookAttributes } from "../types/types";
import HttpStatusCodes from "http-status-codes";
import ApiError from "../utils/ApiError";
import { Op } from "sequelize";

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
    throw new ApiError(HttpStatusCodes.NOT_FOUND, "Book not found");
  }

  await book.destroy();
};

export const updateBookService = async (
  updateDetails: Partial<BookAttributes>
) => {
  const book = await Book.findByPk(updateDetails.id);

  if (!book) {
    throw new ApiError(HttpStatusCodes.NOT_FOUND, "Book not found");
  }
  // Remove id from the updateDetails to prevent it from being updated
  const { id, ...updateData } = updateDetails;
  // updateData.updatedAt = new Date();
  console.log(updateData);
  const updatedBook = await book.update(updateDetails);

  return updatedBook;
};

export const searchBooksService = async (query: string) => {
  const books = await Book.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.iLike]: `%${query}%` } }, // Case-insensitive partial match
        { author: { [Op.iLike]: `%${query}%` } },
        { isbn: { [Op.iLike]: `%${query}%` } },
      ],
    },
  });

  return books;
};
