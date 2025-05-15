import { z } from "zod";

export const signInSchema = z.object({
  username: z.string().min(1, "Username jest wymagany"),
  password: z.string().min(1, "Hasło jest wymagane"),
});

export type SignInSchema = z.infer<typeof signInSchema>;
