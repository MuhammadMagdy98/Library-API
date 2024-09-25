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
