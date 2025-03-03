import { orderingFormSchema } from "@/lib/validation/ordering-form-schema";
import { recipientFormSchema } from "@/lib/validation/recipient-form-schema";
import { z } from "zod";

export class OrderSchema {
  public static createWithDetails = z.object({
    recipientFormData: recipientFormSchema,
    orderingFormData: orderingFormSchema,
  });
}
