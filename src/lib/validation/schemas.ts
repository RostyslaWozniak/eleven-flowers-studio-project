import { z } from "zod";

// Base reusable schemas
export const schemaRequiredString = z.string().trim().min(1, "required");
export const schemaOptionalString = z.string().trim().optional();
export const schemaSlug = z
  .string()
  .regex(/^[a-z0-9-]+$/, "invalid slug")
  .min(1, "required");
