import type { z } from "zod";
import type {
  createContactInfoSchema,
  updateContactInfoSchema,
} from "./contact-info.schema";

export type CreateContactInfoSchema = z.infer<typeof createContactInfoSchema>;

export type UpdateContactInfoSchema = z.infer<typeof updateContactInfoSchema>;

export type ContactInfoDTO = {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  wantsMarketingEmails: boolean;
};
