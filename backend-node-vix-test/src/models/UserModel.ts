import { prisma } from "../database/client";
import { Prisma, user } from "@prisma/client";
import {
  TUserCreated,
  userCreatedSchema,
} from "../types/validations/User/createUser";
import {
  TUserUpdated,
  userUpdatedSchema,
} from "../types/validations/User/updateUser";

export class UserModel {
  // Busca um usuário pelo ID
  async getById(id: string): Promise<user | null> {
    return prisma.user.findUnique({
      where: { idUser: id },
    });
  }

  // Busca um usuário pelo email
  async getByEmail(email: string): Promise<user | null> {
    return prisma.user.findFirst({
      where: { email },
    });
  }

  // Lista todos os usuários com suporte a filtros dinâmicos
  async listAll(query: Prisma.userWhereInput = {}): Promise<user[]> {
    return prisma.user.findMany({
      where: query, // Permite aplicar filtros avançados
    });
  }

  // Cria um novo usuário com validação de dados
  async createUser(data: Prisma.userCreateInput): Promise<TUserCreated> {
    const userCreated = await prisma.user.create({
      data,
    });
    return userCreatedSchema.parse(userCreated); // Valida os dados criados
  }

  // Atualiza um usuário existente
  async updateUser(
    id: string,
    data: Prisma.userUpdateInput,
    currentUser: user,
  ): Promise<TUserUpdated> {
    const updatedUser = await prisma.user.update({
      where: { idUser: id },
      data,
    });
    return userUpdatedSchema.parse(updatedUser); // Valida os dados atualizados
  }

  // Deleta um usuário pelo ID
  async deleteUser(id: string): Promise<user> {
    return prisma.user.delete({
      where: { idUser: id },
    });
  }
}
