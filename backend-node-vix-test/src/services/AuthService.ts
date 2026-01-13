import { UserModel } from "../models/UserModel";
import { AppError } from "../errors/AppError";
import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";
import { compare } from "bcryptjs";
import { genToken } from "../utils/jwt";
import { user } from "@prisma/client";

type UserWithoutPassword = Omit<user, "password">;

export class AuthService {
  private userModel = new UserModel();

  async login(
    email: string,
    password: string,
  ): Promise<{ token: string; user: UserWithoutPassword }> {
    const user = await this.userModel.getByEmail(email);

    if (!user) {
      throw new AppError(
        ERROR_MESSAGE.INVALID_EMAIL_OR_PASSWORD,
        STATUS_CODE.UNAUTHORIZED,
      );
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError(
        ERROR_MESSAGE.INVALID_EMAIL_OR_PASSWORD,
        STATUS_CODE.UNAUTHORIZED,
      );
    }

    const token = genToken({ id: user.idUser, role: user.role });

    // Remove password from user object before returning
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...userWithoutPassword } = user;

    return {
      token,
      user: userWithoutPassword,
    };
  }
}
