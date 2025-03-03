import { ORDER_METHODS } from "@/lib/utils/delivery";
import { z } from "zod";

export class DeliveryDetailsSchema {
  public static create = z.object({
    name: z.string(),
    phone: z.string(),
    deliveryDate: z.date(),
    deliveryTime: z.string(),
    description: z.string().optional(),
    flowerMessage: z.string().optional(),
    method: z.enum(ORDER_METHODS),
  });
}
