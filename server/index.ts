import express from "express";
import env from "./config/env";
import { connectDB } from "./config/db";
import logger from "./config/logger";
import Book from "./model/Book";
import Borrower from "./model/Borrower";
import BorrowingProcess from "./model/BorrowingProcess";
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const startServer = async () => {
  try {
    await connectDB();
    await Book.sync();
    await Borrower.sync();
    await BorrowingProcess.sync();
    const PORT = env.PORT;
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    logger.error("Failed to start the server:", error);
  }
};

startServer();
