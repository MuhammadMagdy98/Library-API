import fs from "fs";
import csv from "fast-csv";
import BorrowingProcess from "../model/BorrowingProcess";
import ApiError from "../utils/ApiError";
import HttpStatusCodes from "http-status-codes";
import { Op } from "sequelize";
import { AnalyticsAttributes } from "../types/types";

export const getBorrowingAnalyticsService = async (
  analytics: AnalyticsAttributes
) => {
  const borrowings = await BorrowingProcess.findAll({
    where: {
      borrowingDate: {
        [Op.between]: [analytics?.startDate, analytics?.endDate],
      },
    },
  });

  if (!borrowings.length) {
    throw new ApiError(
      HttpStatusCodes.NOT_FOUND,
      "No records found for the specified period"
    );
  }

  return borrowings;
};
export const exportBorrowingsToCSVService = async (
  borrowings: any[],
  filePath: string
) => {
  const writableStream = fs.createWriteStream(filePath);
  const csvStream = csv.format({ headers: true });

  csvStream.pipe(writableStream);

  borrowings.forEach((borrowing) => {
    csvStream.write({
      id: borrowing.id,
      borrowerName: borrowing.borrowerName,
      itemName: borrowing.itemName,
      borrowingDate: borrowing.borrowingDate,
      returnDate: borrowing.returnDate,
    });
  });

  csvStream.end();

  return filePath;
};
