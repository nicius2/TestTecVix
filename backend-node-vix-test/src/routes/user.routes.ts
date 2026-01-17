import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { API_VERSION, ROOT_PATH } from "../constants/basePathRoutes";
import { isManagerOrIsAdmin } from "../auth/isManagerOrIsAdmin";
import { isAdmin } from "../auth/isAdmin";
import { authUser } from "../auth/authUser";

const BASE_PATH = API_VERSION.V1 + ROOT_PATH.USER; // Exemplo: /api/v1/user

const userRoutes = Router();

export const makeUserController = () => {
  return new UserController();
};

const userController = makeUserController();

// Rotas de CRUD para usuários
userRoutes.get(`${BASE_PATH}`, async (req, res) => {
  await userController.listAll(req, res);
});

userRoutes.get(`${BASE_PATH}/token/:id`, authUser, async (req, res) => {
  await userController.refreshToken(req, res);
});

userRoutes.get(`${BASE_PATH}/:id`, async (req, res) => {
  await userController.getById(req, res);
});

userRoutes.post(`${BASE_PATH}`, isManagerOrIsAdmin, async (req, res) => {
  await userController.createUser(req, res);
});

userRoutes.put(`${BASE_PATH}/:id`, isManagerOrIsAdmin, async (req, res) => {
  await userController.updateUser(req, res);
});

userRoutes.delete(`${BASE_PATH}/:id`, isAdmin, async (req, res) => {
  await userController.deleteUser(req, res);
});

export { userRoutes };
