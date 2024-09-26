import catchAsync from "../utils/catchAsync";
import { Request, Response } from "express";
import * as csv from "fast-csv";
import { getBorrowingAnalyticsService } from "../services/analytics.service";
import logger from "../config/logger";
export const exportBorrowingsToCSVController = catchAsync(
  async (req: Request, res: Response) => {
    const { startDate, endDate } = req.query;

    const borrowings = await getBorrowingAnalyticsService({
      startDate: !startDate ? undefined : new Date(startDate as string),
      endDate: !endDate ? undefined : new Date(endDate as string),
    });

    res.setHeader(
      "Content-Disposition",
      'attachment; filename="borrowings.csv"'
    );
    res.setHeader("Content-Type", "text/csv");
    const csvStream = csv.format({ headers: true });
    csvStream.pipe(res);

    borrowings.forEach((borrowing: any) => {
      csvStream.write({
        id: borrowing.id,
        "Borrower Name": borrowing.User.name,
        "Borrower Email": borrowing.User.email,
        "Book Title": borrowing.Book.title,
        "Book Author": borrowing.Book.author,
        "Borrowing Date": borrowing.createdAt,
        "Return Date": borrowing.returnedAt,
      });
    });

    csvStream.end();

    logger.info("CSV file sent successfully");
  }
);
