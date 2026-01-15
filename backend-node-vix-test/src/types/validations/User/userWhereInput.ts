import { z } from "zod";

// Esquema de validação para os filtros de listagem de usuários
export const userWhereInputSchema = z.object({
  username: z.string().optional(), // Filtro por nome de usuário
  email: z.string().email().optional(), // Filtro por email válido
  isActive: z.boolean().optional(), // Filtro por status de atividade
  createdAt: z.date().optional(), // Filtro por data de criação
  updatedAt: z.date().optional(), // Filtro por data de atualização
});

// Tipo inferido a partir do esquema
export type TUserWhereInput = z.infer<typeof userWhereInputSchema>;
