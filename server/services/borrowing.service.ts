import BorrowingProcess from "../model/BorrowingProcess";
import Book from "../model/Book";
import ApiError from "../utils/ApiError";
import { BorrowingProccessAttributes } from "../types/types";
import HttpStatusCodes from "http-status-codes";
import { Op } from "sequelize";

export const checkoutBookService = async (
  borrowingProccess: BorrowingProccessAttributes
) => {
  const book = await Book.findByPk(borrowingProccess.bookId);

  if (!book || book.availableQuantity <= 0) {
    throw new ApiError(
      HttpStatusCodes.FORBIDDEN,
      "Book is not available for checkout."
    );
  }

  const borrowingProcess = await BorrowingProcess.create({
    borrowerId: borrowingProccess.borrowerId,
    bookId: borrowingProccess.bookId,
    dueDate: borrowingProccess.dueDate,
  });

  book.availableQuantity -= 1;
  await book.save();

  return borrowingProcess;
};

export const returnBookService = async (
  borrowingProccess: Partial<BorrowingProccessAttributes>
) => {
  const borrowedBook = await BorrowingProcess.findOne({
    where: {
      borrowerId: borrowingProccess.borrowerId,
      bookId: borrowingProccess.bookId,
      returnedAt: null,
    },
  });

  if (!borrowedBook) {
    throw new ApiError(
      HttpStatusCodes.NOT_FOUND,
      "No record of this borrowed book."
    );
  }

  borrowedBook.returnedAt = new Date();
  await borrowedBook.save();

  const book = await Book.findByPk(borrowingProccess.bookId);
  if (book) {
    book.availableQuantity += 1;
    await book.save();
  }

  return borrowedBook;
};

export const getCurrentBorrowedBooksService = async (
  borrowingProccess: Partial<BorrowingProccessAttributes>
) => {
  const borrowedBooks = await BorrowingProcess.findAll({
    where: { borrowerId: borrowingProccess.borrowerId, returnedAt: null },
    include: [{ model: Book }],
  });

  return borrowedBooks;
};

export const getOverdueBooksService = async (
  borrowingProccess: Partial<BorrowingProccessAttributes>
) => {
  const overdueBooks = await BorrowingProcess.findAll({
    where: {
      borrowerId: borrowingProccess.borrowerId,
      returnedAt: null,
      dueDate: {
        [Op.lt]: new Date(),
      },
    },
    include: [{ model: Book }],
  });

  return overdueBooks;
};
