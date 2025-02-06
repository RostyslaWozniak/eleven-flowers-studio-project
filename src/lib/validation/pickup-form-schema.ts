import { z } from "zod";

export const pickupFormSchema = z.object({
  firstName: z.string().trim().optional(),
  lastName: z.string().trim().optional(),
  email: z.string().email().trim(),
});

export type PickupFormSchema = z.infer<typeof pickupFormSchema>;
