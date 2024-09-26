import express from "express";
import API_URLS from "../constants/urls";
import { adminAuth } from "../middlewares/admin.auth";
import { validate } from "../middlewares/validate";
import {
  addBookSchema,
  deleteBookSchema,
  updateBookSchema,
} from "../validations/book.validation";
import {
  addBookController,
  deleteBookController,
  getAllBooksController,
  searchBooksController,
  updateBookController,
} from "../controllers/book.controller";
import { updateBorrowerController } from "../controllers/borrower.controller";

const router = express.Router();

router.post(
  API_URLS.ADD_BOOK,
  adminAuth,
  validate(addBookSchema),
  addBookController
);

router.put(
  API_URLS.UPDATE_BOOK,
  adminAuth,
  validate(updateBookSchema),
  updateBookController
);

router.delete(
  API_URLS.DELETE_BOOK,
  adminAuth,
  validate(deleteBookSchema),
  deleteBookController
);

router.get(API_URLS.GET_BOOKS, adminAuth, getAllBooksController);

router.get(API_URLS.SEARCH_BOOKS, adminAuth, searchBooksController); 

export default router;
