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
  return jwt.verify(token, SECRET_KEY);
};

export const decodeToken = (token: string): JwtPayload | null | string => {
  return jwt.decode(token) as JwtPayload;
};
