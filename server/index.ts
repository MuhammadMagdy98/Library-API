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
import { errorConverter, errorHandler } from "./middlewares/error";
import InitializationFlag from "./model/InitializationFlag";
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(borrowRoutes);
app.use(authRoutes);

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
