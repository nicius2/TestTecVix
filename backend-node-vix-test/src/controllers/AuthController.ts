import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { STATUS_CODE } from "../constants/statusCode";
import { loginSchema } from "../types/validations/Auth/login";

export class AuthController {
  private authService = new AuthService();

  async login(req: Request, res: Response) {
    const { email, password } = loginSchema.parse(req.body);
    const result = await this.authService.login(email, password);
    return res.status(STATUS_CODE.OK).json(result);
  }
}
