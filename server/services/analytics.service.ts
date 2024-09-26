import BorrowingProcess from "../model/BorrowingProcess";
import ApiError from "../utils/ApiError";
import HttpStatusCodes from "http-status-codes";
import { Op } from "sequelize";
import { AnalyticsAttributes } from "../types/types";
import User from "../model/User";
import Book from "../model/Book";
export const getBorrowingAnalyticsService = async (
  analytics: AnalyticsAttributes
) => {
  let borrowings: any = [];

  const includeOptions = [
    {
      model: User,
      attributes: ["name", "email"],
    },
    {
      model: Book,
      attributes: ["title", "author"],
    },
  ];
  // if no dates are provided return all
  if (!analytics.startDate && !analytics.startDate) {
    borrowings = await BorrowingProcess.findAll({ include: includeOptions });
    return borrowings;
  }
  // end date exists but not start date, get all before endDate
  else if (!analytics.startDate) {
    borrowings = await BorrowingProcess.findAll({
      where: {
        createdAt: {
          [Op.lte]: analytics.endDate,
        },
        include: includeOptions,
      },
    });
  }
  // start date exists but not end date, get all after startDate
  else if (!analytics.endDate) {
    borrowings = await BorrowingProcess.findAll({
      where: {
        createdAt: {
          [Op.gte]: analytics.startDate,
        },
        include: includeOptions,
      },
    });
  }
  // find all in between
  else {
    borrowings = await BorrowingProcess.findAll({
      where: {
        createdAt: {
          [Op.between]: [analytics?.startDate, analytics?.endDate],
        },
        include: includeOptions,
      },
    });
  }

  if (!borrowings.length) {
    throw new ApiError(
      HttpStatusCodes.NOT_FOUND,
      "No records found for the specified period"
    );
  }

  return borrowings;
};
