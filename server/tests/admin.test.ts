import request from "supertest";
import HttpStatusCodes from "http-status-codes";
import app from "..";
import API_URLS from "../constants/urls";

describe("Admin Login and Borrower Registration", () => {
  let adminToken: string;
  let borrowerToken: string;

  it("should log in as admin and return a token", async () => {
    const adminCredentials = {
      email: process.env.ADMIN_EMAIL, // Use admin email from .env
      password: process.env.ADMIN_PASSWORD, // Use admin password from .env
    };

    const response = await request(app)
      .post(API_URLS.LOGIN)
      .send(adminCredentials);

    expect(response.status).toBe(HttpStatusCodes.OK);
    expect(response.body).toHaveProperty("token");
    expect(response.body.message).toBe("Login is successful");

    adminToken = response.body.token;
    console.log(adminToken);
  });

  it("should register a new borrower as an admin", async () => {
    const borrowerData = {
      email: "newborrower5@example.com",
      password: "borrowerpassword5",
      name: "New Borrower",
    };

    const response = await request(app)
      .post(API_URLS.ADD_BORROWER)
      .set("Authorization", `Bearer ${adminToken}`)
      .send(borrowerData);

    expect(response.status).toBe(HttpStatusCodes.CREATED);
    expect(response.body.message).toBe("Borrower is added successfully");
  });

  it("should log in as a borrower and return a token", async () => {
    const borrowerCredentials = {
      email: "newborrower5@example.com", // Use an actual borrower email from your database
      password: "borrowerpassword5", // Use the actual password for the borrower
    };

    const response = await request(app)
      .post(API_URLS.LOGIN)
      .send(borrowerCredentials);

    expect(response.status).toBe(HttpStatusCodes.OK);
    expect(response.body).toHaveProperty("token");
    expect(response.body.message).toBe("Login is successful");

    borrowerToken = response.body.token; // Save the token for the next test
  });

  it("should deny access when a borrower tries to register a new borrower", async () => {
    const borrowerData = {
      email: "anotherborrower@example.com",
      password: "anotherpassword",
      name: "Another Borrower",
    };

    const response = await request(app)
      .post(API_URLS.ADD_BORROWER)
      .set("Authorization", `Bearer ${borrowerToken}`) // Use the borrower token
      .send(borrowerData);

    expect(response.status).toBe(HttpStatusCodes.FORBIDDEN); // Assuming "403 Forbidden" is returned for access denied
    expect(response.body.message).toBe("Access denied"); // Adjust this message according to your API implementation
  });
});
