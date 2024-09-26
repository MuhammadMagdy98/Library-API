import catchAsync from "../utils/catchAsync";
import { Request, Response } from "express";
import HttpStatusCodes from "http-status-codes";
import path from "path";
import {
  getBorrowingAnalyticsService,
  exportBorrowingsToCSVService,
} from "../services/analytics.service";
export const exportBorrowingsToCSVController = catchAsync(
  async (req: Request, res: Response) => {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ message: "Start date and end date are required" });
    }

    const borrowings = await getBorrowingAnalyticsService({
      startDate: new Date(startDate as string),
      endDate: new Date(endDate as string),
    });

    const filePath = path.join(__dirname, "..", "exports", "borrowings.csv");

    await exportBorrowingsToCSVService(borrowings, filePath);

    res.download(filePath, "borrowings.csv");
  }
);
