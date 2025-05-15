import { z } from "zod";

export const signInSchema = z.object({
  username: z.string().min(1, "Field is required"),
  password: z.string().min(1, "Field is required"),
});

export type SignInSchema = z.infer<typeof signInSchema>;
