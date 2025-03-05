import { z } from "zod";

export const subscribeFormSchema = z.object({ email: z.string().email() });

export type SubscribeFormSchema = z.infer<typeof subscribeFormSchema>;
