import express from "express";
import API_URLS from "../constants/urls";
import { authenticate } from "../middlewares/authenticate";
import {
  checkoutBookSchema,
  returnBookSchema,
} from "../validations/borrowing.validation";
import { validate } from "../middlewares/validate";
import {
  checkoutBookController,
  getCurrentBorrowedBooksController,
  getOverdueBooksController,
  returnBookController,
} from "../controllers/borrowing.controller";

const router = express.Router();

router.post(
  API_URLS.CHECKOUT_BOOK,
  authenticate,
  validate(checkoutBookSchema),
  checkoutBookController
);

router.post(
  API_URLS.RETURN_BOOK,
  authenticate,
  validate(returnBookSchema),
  returnBookController
);

router.get(
  API_URLS.CHECK_BOOK,
  authenticate,
  getCurrentBorrowedBooksController
);

router.get(API_URLS.GET_OVERTIME, authenticate, getOverdueBooksController);


export default router;