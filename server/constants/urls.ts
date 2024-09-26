const BASE_URL = process.env.BASE_URL || "";
const API_VERSION = "v1";

export const API_URLS = {
  LOGIN: `${BASE_URL}/api/${API_VERSION}/login`,
  GET_BOOKS: `${BASE_URL}/api/${API_VERSION}/books`,
  SEARCH_BOOKS: `${BASE_URL}/api/${API_VERSION}/books/search`,
  ADD_BOOK: `${BASE_URL}/api/${API_VERSION}/books/add`,
  UPDATE_BOOK: `${BASE_URL}/api/${API_VERSION}/books/update/`,
  DELETE_BOOK: `${BASE_URL}/api/${API_VERSION}/books/delete/:id`,
  GET_BORROWERS: `${BASE_URL}/api/${API_VERSION}/borrowers`,
  ADD_BORROWER: `${BASE_URL}/api/${API_VERSION}/borrowers/add`,
  UPDATE_BORROWER: `${BASE_URL}/api/${API_VERSION}/borrowers/update`,
  DELETE_BORROWER: `${BASE_URL}/api/${API_VERSION}/borrowers/delete/:id`,
  CHECKOUT_BOOK: `${BASE_URL}/api/${API_VERSION}/borrowers/checkout`,
  CHECK_BOOK: `${BASE_URL}/api/${API_VERSION}/borrowers/check`,
  RETURN_BOOK: `${BASE_URL}/api/${API_VERSION}/borrowers/return`,
  GET_OVERTIME: `${BASE_URL}/api/${API_VERSION}/borrowers/overtime`,
  ANALYTICS_REPORT_EXPORT: `${BASE_URL}/api/${API_VERSION}/analytics/export`,
};

export default API_URLS;
