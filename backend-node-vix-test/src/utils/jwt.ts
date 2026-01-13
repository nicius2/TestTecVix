import jwt, { TokenExpiredError } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";

const secret = process.env.JWT_SECRET || "default_secret";

export interface IPayload {
  id: string;
  role: string;
}

export const genToken = (payload: IPayload): string => {
  return jwt.sign(payload, secret, { expiresIn: "1d" });
};

export const verifyToken = (token: string): IPayload => {
  try {
    const data = jwt.verify(token, secret) as IPayload;
    return data;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new AppError(ERROR_MESSAGE.INVALID_TOKEN, STATUS_CODE.UNAUTHORIZED);
    }
    throw new AppError(ERROR_MESSAGE.INVALID_TOKEN, STATUS_CODE.UNAUTHORIZED);
  }
};
