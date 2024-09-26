const API_VERSION = "v1";
const BASE_URL = `api/${API_VERSION}`;


export const API_URLS = {
  LOGIN: `${BASE_URL}/login`,
  GET_BOOKS: `${BASE_URL}/books`,
  SEARCH_BOOKS: `${BASE_URL}/books/search`,
  ADD_BOOK: `${BASE_URL}/books/add`,
  UPDATE_BOOK: `${BASE_URL}/books/update/`,
  DELETE_BOOK: `${BASE_URL}/books/delete/:id`,
  GET_BORROWERS: `${BASE_URL}/borrowers`,
  ADD_BORROWER: `${BASE_URL}/borrowers/add`,
  UPDATE_BORROWER: `${BASE_URL}/borrowers/update`,
  DELETE_BORROWER: `${BASE_URL}/borrowers/delete/:id`,
  CHECKOUT_BOOK: `${BASE_URL}/borrowers/checkout`,
  CHECK_BOOK: `${BASE_URL}/borrowers/check`,
  RETURN_BOOK: `${BASE_URL}/borrowers/return`,
  GET_OVERTIME: `${BASE_URL}/borrowers/overtime`,
  ANALYTICS_REPORT_EXPORT: `${BASE_URL}/analytics/export`,
};

export default API_URLS;
