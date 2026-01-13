import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { STATUS_CODE } from "../constants/statusCode";
import { loginSchema } from "../types/validations/Auth/login";
import { registerSchema } from "../types/validations/Auth/register";

export class AuthController {
  private authService = new AuthService();

  async login(req: Request, res: Response) {
    const { email, password } = loginSchema.parse(req.body);
    const result = await this.authService.login(email, password);
    return res.status(STATUS_CODE.OK).json(result);
  }

  async register(req: Request, res: Response) {
    const data = registerSchema.parse(req.body);
    const result = await this.authService.register(data);
    return res.status(STATUS_CODE.CREATED).json(result);
  }
}
