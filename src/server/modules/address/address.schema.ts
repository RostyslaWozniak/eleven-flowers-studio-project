import { z } from "zod";

export class AddressSchema {
  public static create = z.object({
    city: z.string(),
    street: z.string(),
    postCode: z.string(),
  });
}
