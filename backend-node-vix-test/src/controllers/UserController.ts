import { Response } from "express";
import { CustomRequest } from "../types/custom";
import { UserService } from "../services/UserService";
import { STATUS_CODE } from "../constants/statusCode";
import { user } from "@prisma/client";

export class UserController {
  constructor() {}
  private userService = new UserService();

  async getById(req: CustomRequest<unknown>, res: Response) {
    const { id } = req.params;
    const result = await this.userService.getById(Number(id));
    return res.status(STATUS_CODE.OK).json(result);
  }

  async listAll(req: CustomRequest<unknown>, res: Response) {
    const result = await this.userService.listAll(req.query);
    return res.status(STATUS_CODE.OK).json(result);
  }

  async createUser(req: CustomRequest<unknown>, res: Response) {
    const user = req.user as user;
    const result = await this.userService.createUser(req.body, user);
    return res.status(STATUS_CODE.CREATED).json(result);
  }

  async updateUser(req: CustomRequest<unknown>, res: Response) {
    const { id } = req.params;
    const user = req.user as user;
    const result = await this.userService.updateUser(Number(id), req.body, user);
    return res.status(STATUS_CODE.OK).json(result);
  }

  async deleteUser(req: CustomRequest<unknown>, res: Response) {
    const { id } = req.params;
    const user = req.user as user;
    const result = await this.userService.deleteUser(Number(id), user);
    return res.status(STATUS_CODE.OK).json(result);
  }
}