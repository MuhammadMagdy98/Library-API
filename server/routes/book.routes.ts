import express from "express";
import API_URLS from "../constants/urls";

const router = express.Router();

router.post(API_URLS.ADD_BOOK);

router.put(API_URLS.UPDATE_BOOK);

router.delete(API_URLS.DELETE_BOOK);

router.get(API_URLS.GET_BOOKS);
