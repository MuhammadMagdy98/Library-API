import express from "express";
import API_URLS from "../constants/urls";

const router = express.Router();

router.post(API_URLS.CHECKOUT_BOOK);

router.post(API_URLS.RETURN_BOOK);

router.post(API_URLS.CHECKOUT_BOOK);

router.post(API_URLS.GET_OVERTIME);
