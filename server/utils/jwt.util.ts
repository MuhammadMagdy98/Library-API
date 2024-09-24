import jwt, { JwtPayload } from "jsonwebtoken";
import env from "../config/env";

const SECRET_KEY = env.JWT_SECRET;

export const generateToken = (
  payload: object,
  expiresIn: string | number = "1h"
): string => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

export const verifyToken = (token: string): JwtPayload | string => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

export const decodeToken = (token: string): JwtPayload | null => {
  return jwt.decode(token) as JwtPayload;
};
