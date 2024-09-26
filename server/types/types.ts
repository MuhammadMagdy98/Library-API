export interface BorrowerAttributes {
  email: string;
  name: string;
  password: string;
}

export interface LoginAttributes {
  email: string;
  password: string;
}

export interface UpdateBorrowerAttributes {
  id: string;
  email?: string;
  name?: string;
  password?: string;
}

export interface BookAttributes {
  id: number;
  title: string;
  author: string;
  isbn: string;
  availableQuantity?: number; // optional, since it defaults to 1
  shelfLocation: string;
  updatedAt: Date;
}

export interface BorrowingProccessAttributes {
  bookId: number;
  borrowerId: number;
  dueDate: Date;
}

export interface AnalyticsAttributes {
  startDate?: Date;
  endDate?: Date;
}