import { comparePasswords } from "../utils/password.util";
import { generateToken } from "../utils/jwt.util";
import ApiError from "../utils/ApiError";
import HttpStatusCodes from "http-status-codes";
import User from "../model/User";
import { LoginAttributes } from "../types/types";

export const loginService = async (loginDetails: LoginAttributes) => {
  const user = await User.findOne({
    where: { email: loginDetails.email },
  });

  if (!user) {
    throw new ApiError(
      HttpStatusCodes.UNAUTHORIZED.valueOf(),
      "Invalid email or password"
    );
  }

  const isPasswordValid = await comparePasswords(
    loginDetails.password,
    user.password
  );
  if (!isPasswordValid) {
    throw new ApiError(
      HttpStatusCodes.UNAUTHORIZED.valueOf(),
      "Invalid email or password"
    );
  }



  return user;
};
