import express from "express";
import env from "./config/env";
import { connectDB } from "./config/db";
import logger from "./config/logger";
import Book from "./model/Book";
import User from "./model/User";
import BorrowingProcess from "./model/BorrowingProcess";
import initializeAdminEmails from "./config/init.admin";
import borrowRoutes from "./routes/borrow.routes";
import authRoutes from "./routes/auth.routes";
import bookRoutes from "./routes/book.routes";
import borrowingRoutes from "./routes/borrowing.routes";
import analyticsRoutes from "./routes/analytics.routes";
import { errorConverter, errorHandler } from "./middlewares/error";
import InitializationFlag from "./model/InitializationFlag";
import API_URLS from "./constants/urls";
import { FIFTEEN_MINUTES, MAX_REQUESTS } from "./constants/utils";
import { createRateLimiter } from "./utils/rateLimiter";
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// limit to 100 requests in 15 minuutes
app.use(API_URLS.GET_BOOKS, createRateLimiter(FIFTEEN_MINUTES, MAX_REQUESTS));
app.use(
  API_URLS.SEARCH_BOOKS,
  createRateLimiter(FIFTEEN_MINUTES, MAX_REQUESTS)
);

// all the routes
app.use(borrowRoutes);
app.use(authRoutes);
app.use(bookRoutes);
app.use(borrowingRoutes);
app.use(analyticsRoutes);

const startServer = async () => {
  try {
    await connectDB();
    await Book.sync();
    await User.sync();
    await BorrowingProcess.sync();
    await InitializationFlag.sync();
    await initializeAdminEmails();
    const PORT = env.PORT;
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    logger.error("Failed to start the server:", error);
  }
};

startServer();

app.use(errorConverter);

app.use(errorHandler);

export default app; // for testing
