import { user } from "@prisma/client";
import { UserModel } from "../models/UserModel";
import { AppError } from "../errors/AppError";
import { STATUS_CODE } from "../constants/statusCode";
import { ERROR_MESSAGE } from "../constants/erroMessages";
import {
  TUserCreated,
  userCreatedSchema,
} from "../types/validations/User/createUser"; // Corrigido
import {
  TUserUpdated,
  userUpdatedSchema,
} from "../types/validations/User/updateUser"; // Corrigido
import { userWhereInputSchema } from "../types/validations/User/userWhereInput";

export class UserService {
  constructor() {}
  private userModel = new UserModel();

  async getById(id: string) {
    const user = await this.userModel.getById(id);
    if (!user) {
      throw new AppError(ERROR_MESSAGE.USER_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }
    return user;
  }

  async listAll(query: unknown): Promise<user[]> {
    try {
      const validatedQuery = userWhereInputSchema.parse(query); // Corrigido
      return this.userModel.listAll(validatedQuery);
    } catch (error) {
      throw new AppError(ERROR_MESSAGE.INVALID_DATA, STATUS_CODE.BAD_REQUEST);
    }
  }

  async createUser(data: TUserCreated, currentUser?: user) {
    // Corrigido
    const validData = userCreatedSchema.parse(data); // Corrigido
    const newUser = await this.userModel.createUser(validData);
    return newUser;
  }

  async updateUser(id: string, data: TUserUpdated, currentUser: user) {
    // Corrigido
    const validData = userUpdatedSchema.parse(data); // Corrigido
    const existingUser = await this.userModel.getById(id);

    if (!existingUser) {
      throw new AppError(ERROR_MESSAGE.USER_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    const updatedUser = await this.userModel.updateUser(
      id,
      validData,
      currentUser,
    );
    return updatedUser;
  }

  async deleteUser(id: string, currentUser: user) {
    const existingUser = await this.userModel.getById(id);

    if (!existingUser) {
      throw new AppError(ERROR_MESSAGE.USER_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    const deletedUser = await this.userModel.deleteUser(id);
    return deletedUser;
  }
}
