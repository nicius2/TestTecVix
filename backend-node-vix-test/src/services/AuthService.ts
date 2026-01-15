import { UserModel } from "../models/UserModel";
import { AppError } from "../errors/AppError";
import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";
import { compare, hash } from "bcryptjs";
import { genToken } from "../utils/jwt";
import { user } from "@prisma/client";
import { TRegister } from "../types/validations/Auth/register";

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

    const { password: _password, ...userWithoutPassword } = user;

    return {
      token,
      user: userWithoutPassword,
    };
  }

  async register(data: TRegister): Promise<{ user: UserWithoutPassword }> {
    const userAlreadyExists = await this.userModel.getByEmail(data.email);

    if (userAlreadyExists) {
      throw new AppError(
        ERROR_MESSAGE.USER_ALREADY_EXISTS,
        STATUS_CODE.CONFLICT,
      );
    }

    const hashedPassword = await hash(data.password, 8);

    const newUser = await this.userModel.createUser({
      username: data.username,
      email: data.email,
      password: hashedPassword,
      role: "member",
      isActive: true,
    });

    const { password: _password, ...userWithoutPassword } = newUser as user;

    return {
      user: userWithoutPassword,
    };
  }
}
