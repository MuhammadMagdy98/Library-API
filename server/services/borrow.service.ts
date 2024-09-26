import ApiError from "../utils/ApiError";
import User from "../model/User";
import { BorrowerAttributes, UpdateBorrowerAttributes } from "../types/types";
import HttpStatusCodes from "http-status-codes";
import { hashPassword } from "../utils/password.util";
export const addBorrowerService = async (borrowDetails: BorrowerAttributes) => {
  const hashedPassword = await hashPassword(borrowDetails.password);
  const borrower = await User.create({
    email: borrowDetails.email,
    name: borrowDetails.name,
    password: hashedPassword,
  });
  if (!borrower) {
    throw new ApiError(HttpStatusCodes.CONFLICT, "The email already exists");
  }
  return borrower;
};

export const updateBorrowerService = async (
  borrowDetails: UpdateBorrowerAttributes
) => {
  const borrower = await User.findByPk(borrowDetails.id);

  if (!borrower) {
    throw new ApiError(
      HttpStatusCodes.NOT_FOUND,
      `Borrower with ID ${borrowDetails.id} not found`
    );
  }

  if (borrowDetails.password) {
    borrowDetails.password = await hashPassword(borrowDetails.password);
  }

  const updatedBorrower = await borrower.update({
    name: borrowDetails.name || borrower.name,
    email: borrowDetails.email || borrower.email,
    password: borrowDetails.password || borrower.password,
  });

  return updatedBorrower;
};

export const deleteBorrowerService = async (id: number) => {
  const borrower = await User.findByPk(id);

  if (!borrower) {
    throw new ApiError(
      HttpStatusCodes.NOT_FOUND,
      `Borrower with ID ${id} not found`
    );
  }

  await borrower.destroy();
};

export const getAllBorrowersService = async () => {
  const borrowers = await User.findAll({
    attributes: ["id", "name", "email", "createdAt", "role"], // Specify the fields to return
  });

  return borrowers;
};
