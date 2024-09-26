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

  const today = new Date();

  if (analytics.endDate) {
    if (
      analytics.endDate.toDateString() === today.toDateString() // Check if endDate is today
    ) {
      analytics.endDate = today; // Set endDate to the current time
    } else {
      analytics.endDate.setHours(23, 59, 59, 999); // Make endDate the end of the day
    }
  }
  if (analytics.startDate) {
    analytics.startDate.setHours(0, 0, 0, 0); // Make startDate the start of the day
  }

  let whereCondition: any = {};
  // Build where condition based on the provided dates
  if (analytics.startDate && analytics.endDate) {
    whereCondition.createdAt = {
      [Op.between]: [analytics.startDate, analytics.endDate],
    };
  } else if (analytics.startDate) {
    whereCondition.createdAt = { [Op.gte]: analytics.startDate };
  } else if (analytics.endDate) {
    whereCondition.createdAt = { [Op.lte]: analytics.endDate };
  }

  const borrowings = await BorrowingProcess.findAll({
    where: Object.keys(whereCondition).length ? whereCondition : undefined,
    include: includeOptions,
  });

  if (!borrowings.length) {
    throw new ApiError(
      HttpStatusCodes.NOT_FOUND,
      "No records found for the specified period"
    );
  }

  return borrowings;
};
