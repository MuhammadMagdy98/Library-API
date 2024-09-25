import express from "express";

import API_URLS from "../constants/urls";

import { validate } from "../middlewares/validate";
import {
  addBorrowerSchema,
  updateBorrowerSchema,
} from "../validations/borrower.validation";
import { addBorrowerController, deleteBorrowerController, updateBorrowerController } from "../controllers/borrower.controller";
import { adminAuth } from "../middlewares/admin.auth";

const router = express.Router();

router.post(
  API_URLS.ADD_BORROWER,
  adminAuth,
  validate(addBorrowerSchema),
  addBorrowerController
);

router.put(API_URLS.UPDATE_BORROWER, adminAuth, validate(updateBorrowerSchema), updateBorrowerController);

router.delete(API_URLS.DELETE_BORROWER, adminAuth, deleteBorrowerController);

router.get(API_URLS.GET_BORROWERS, adminAuth);

export default router;
