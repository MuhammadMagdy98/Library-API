# Library Management System API

## Overview

This Library Management System API allows users to manage books and borrowers in a library. Users can log in, add and update borrowers and books, check out and return books, and retrieve analytics.

## Table of Contents

- [Installation](#installation)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Borrowers](#borrowers)
  - [Books](#books)
  - [Checkout and Return](#checkout-and-return)
  - [Analytics](#analytics)
- [Environment Variables](#environment-variables)
- [License](#license)

## Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```
2. **Install dependencies**:

   ```bash
   npm install
   ```
3. **Set up your `.env` file** with the required environment variables.
4. **Run the application**:

   ```bash
   npm start
   ```

## Database Schema Diagram 
![Untitled](https://github.com/user-attachments/assets/a0c9a22a-1a8e-4020-8b39-4519df457694)



## API Endpoints

### Authentication

**POST** `/api/v1/login`
Login to the system.

**Request Body:**

```json
{
    "email": "lukecholes@gmail.com",
    "password": "xMido123123"
}
```

**Response:**

```json
{
    "token": "<JWT_TOKEN>",
    "message": "Login successful"
}
```

### Borrowers

**POST** `/api/v1/borrowers/add`
Add a new borrower.

**Authorization**: Bearer Token (admin only)

**Request Body:**

```json
{
    "email": "lukecholes1@gmail.com",
    "password": "xMido123123",
    "name": "Magdy"
}
```

**Response:**

```json
{
    "message": "Borrower added successfully"
}
```

---

**DELETE** `/api/v1/borrowers/delete/{id}`
Delete a borrower by ID.

**Authorization**: Bearer Token (admin only)

**Request Body:**

```json
{
    "email": "lukecholes@gmail.com",
    "password": "xMido123123",
    "name": "Magdy"
}
```

**Response:**

```json
{
    "message": "Borrower deleted successfully"
}
```

---

**PUT** `/api/v1/borrowers/update`
Update borrower information.

**Authorization**: Bearer Token (admin only)

**Request Body:**

```json
{
    "id": 2,
    "email": "lukecholes@gmail.com",
    "password": "xMido123123",
    "name": "Magdy"
}
```

**Response:**

```json
{
    "message": "Borrower updated successfully"
}
```

### Books

**POST** `/api/v1/books/add`
Add a new book.

**Authorization**: Bearer Token (admin only)

**Request Body:**

```json
{
    "title": "The Secret World",
    "author": "John Doe",
    "isbn": "9783161484101",
    "availableQuantity": 7,
    "shelfLocation": "A3-21"
}
```

**Response:**

```json
{
    "message": "Book added successfully"
}
```

---

**GET** `/api/v1/books`
Retrieve a list of all books.

**Authorization**: Bearer Token (admin only)

**Response:**

```json
[
    {
        "id": 1,
        "title": "The Secret World",
        "author": "John Doe",
        "isbn": "9783161484101",
        "availableQuantity": 7,
        "shelfLocation": "A3-21"
    },
    ...
]
```

---

**DELETE** `/api/v1/books/delete/{id}`
Delete a book by ID.

**Authorization**: Bearer Token (admin only)

**Response:**

```json
{
    "message": "Book deleted successfully"
}
```

---

**PUT** `/api/v1/books/update`
Update book information.

**Authorization**: Bearer Token (admin only)
**Request Body:**

```json
{
    "id": 4,
    "title": "Migo book 1",
    "author": "abc",
    "availableQuantity": 3
}
```

**Response:**

```json
{
    "message": "Book updated successfully"
}
```

---

**GET** `/api/v1/books/search?title={title}&author={author}`
Search for books by title and author.

**Authorization**: Bearer Token (admin only)

**Query Parameters:**

- `title`: The title of the book
- `author`: The author of the book
- `isbn`: The isbn of the book

**Response:**

```json
[
    {
        "id": 1,
        "title": "The Secret World",
        "author": "John Doe",
        ...
    },
    ...
]
```

### Checkout and Return

**POST** `/api/v1/borrowers/checkout`
Check out a book.

**Authorization**: Bearer Token

**Request Body:**

```json
{
    "bookId": 2,
    "dueDate": "2024-09-29"
}
```

**Response:**

```json
{
    "message": "Book checked out successfully"
}
```

---

**POST** `/api/v1/borrowers/return`
Return a checked-out book.

**Authorization**: Bearer Token

**Request Body:**

```json
{
    "bookId": 1
}
```

**Response:**

```json
{
    "message": "Book returned successfully"
}
```

---

**GET** `/api/v1/borrowers/check`
Get borrowed books.

**Authorization**: Bearer Token

**Response:**

```json
[
    {
        "bookId": 1,
        "title": "The Secret World",
        ...
    },
    ...
]
```

### Analytics

**GET** `/api/v1/analytics/export?startDate={startDate}&endDate={endDate}`
Get analytics data.

**Authorization**: Bearer Token (admin only)

**Query Parameters:** (you can pass any of startDate or endDate or neither)

- `startDate`: The start date for the analytics (format: YYYY-MM-DD)
- `endDate`: The end date for the analytics (format: YYYY-MM-DD)

**Response:**

```csv
id,Borrower Name,Borrower Email,Book Title,Book Author,Borrowing Date,Return Date
10,muhammad.magdy111,muhammad.magdy111@gmail.com,The Secret World,John Doe,Fri Sep 27 2024 00:34:15 GMT+0300 (Eastern European Summer Time),
11,muhammad.magdy111,muhammad.magdy111@gmail.com,The Secret World,John Doe,Fri Sep 27 2024 01:47:32 GMT+0300 (Eastern European Summer Time)
```

## Environment Variables

Make sure to set the following environment variables in your `.env` file:

- `DATABASE_URL`: The URL for connecting to your PostgreSQL database.
- `JWT_SECRET`: The secret key used for signing JWT tokens.
- `PORT`: The port on which the server will run (default is `3000`).
- `ADMIN_EMAIL`: The email address of the admin user.
- `ADMIN_PASSWORD`: The password for the admin user.
- `DB_NAME`: The name of the database.
- `DB_USERNAME`: The username of the database.
- `DB_PASSWORD`: The password of the database.
- `DB_PORT`: The port the database is running on.

### Example `.env.example`

```env
DATABASE_URL=postgres://user:password@localhost:5432/mydb
JWT_SECRET=mysecretkey
PORT=3000
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=adminpassword
DB_NAME=bosta-library
DB_USERNAME=postgres
DB_PASSWORD=db_password
DB_PORT=5432
```
