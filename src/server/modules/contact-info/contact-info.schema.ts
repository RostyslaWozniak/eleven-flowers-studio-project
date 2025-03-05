import { subscribeFormSchema } from "@/lib/validation/subscribe-form-schema";
import { z } from "zod";

export const createContactInfoSchema = subscribeFormSchema.extend({
  name: z.string().optional(),
  phone: z.string().optional(),
  wantsMarketingEmails: z.boolean().optional(),
});

export const updateContactInfoSchema = createContactInfoSchema.extend({
  id: z.string(),
  email: z.string().email().optional(),
});

export const unsubscribeSchema = z.object({
  email: z.string().email(),
});
