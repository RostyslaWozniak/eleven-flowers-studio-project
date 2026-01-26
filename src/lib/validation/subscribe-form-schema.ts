import { z } from "zod";

export const subscribeFormSchema = z.object({
  email: z.string().min(1, "required").email(),
});

export type SubscribeFormSchema = z.infer<typeof subscribeFormSchema>;
