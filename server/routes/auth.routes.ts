import express from "express";
import API_URLS from "../constants/urls";
import { validate } from "../middlewares/validate";
import { loginSchema } from "../validations/login.validation";
import { loginController } from "../controllers/auth.controller";

const router = express.Router();


router.post(API_URLS.LOGIN, validate(loginSchema), loginController);

export default router;