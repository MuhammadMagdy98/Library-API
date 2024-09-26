import express from "express";
import API_URLS from "../constants/urls";
import { adminAuth } from "../middlewares/admin.auth";
import { validate } from "../middlewares/validate";
import { addBookSchema } from "../validations/book.validation";

const router = express.Router();

router.post(API_URLS.ADD_BOOK, adminAuth, validate(addBookSchema), );

router.put(API_URLS.UPDATE_BOOK);

router.delete(API_URLS.DELETE_BOOK);

router.get(API_URLS.GET_BOOKS);
