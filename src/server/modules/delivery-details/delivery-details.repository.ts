import { db } from "@/server/db";
import type {
  DeliveryDetailsDTO,
  CreateDeliveryDetailsSchema,
} from "./delivery-details.types";

export class DeliveryDetailsRepository {
  public static create = async (
    input: CreateDeliveryDetailsSchema,
    orderId: string,
  ): Promise<DeliveryDetailsDTO> => {
    return await db.deliveryDetails.create({
      data: { ...input, orderId },
    });
  };
}
