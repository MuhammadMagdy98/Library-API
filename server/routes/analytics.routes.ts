import express from "express";
import API_URLS from "../constants/urls";
import { adminAuth } from "../middlewares/admin.auth";
import { validateDateRange } from "../validations/analytics.validation";
import { exportBorrowingsToCSVController } from "../controllers/analytics.controller";

const router = express.Router();

router.get(
  API_URLS.ANALYTICS_REPORT_EXPORT,
  adminAuth,
  validateDateRange,
  exportBorrowingsToCSVController
);


export default router;