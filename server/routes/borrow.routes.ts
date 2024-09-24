import express from "express";

import API_URLS from "../constants/urls";

import { validate } from "../middlewares/validate";
import { borrowSchema } from "../validations/borrower.validation";
import { addBorrowerController } from "../controllers/borrower.controller";

const router = express.Router();

router.post(
  API_URLS.ADD_BORROWER,
  validate(borrowSchema),
  addBorrowerController
);

// router.put(API_URLS.UPDATE_BORROWER);

// router.delete(API_URLS.DELETE_BORROWER);

// router.get(API_URLS.GET_BORROWERS);

export default router;
