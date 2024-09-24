import ApiError from "../utils/ApiError";
import Borrower from "../model/Borrower";
import { BorrowerAttributes } from "../types/borrower.types";
import HttpStatusCodes from "http-status-codes";

export const addBorrowerService = async (borrowDetails: BorrowerAttributes) => {
  const borrower = await Borrower.create({
    email: borrowDetails.email,
    name: borrowDetails.name,
  });
  if (!borrower) {
    throw new ApiError(
      HttpStatusCodes.CONFLICT.valueOf(),
      "The email already exists"
    );
  }
  return borrower;
};
