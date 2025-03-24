import { z } from "zod";

export const usersSchema = z.object({
  id: z.number().nullish(),
  name: z
    .string({ required_error: "Nome é obrigatório" })
    .min(1, "Nome é obrigatório"),
  email: z
    .string({ required_error: "E-mail é obrigatório" })
    .min(1, "E-mail é obrigatório")
    .email({ message: "E-mail inválido" }),
  phone: z
    .string({ required_error: "Telefone é obrigatório" })
    .min(1, "Telefone é obrigatório"),
  status: z.boolean().default(false),
});

export type UsersForm = z.infer<typeof usersSchema>;
