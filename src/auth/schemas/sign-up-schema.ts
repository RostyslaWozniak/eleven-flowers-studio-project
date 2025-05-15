import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(1, "Imię jest wymagane"),
  email: z.string().min(1, "Email jest wymagany").email("Niepoprawny email"),
  password: z.string().min(8, "Hasło jest za krotkie"),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
