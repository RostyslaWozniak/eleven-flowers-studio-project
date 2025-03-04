import { TRPCError } from "@trpc/server";
import { DeliveryDetailsRepository } from "./delivery-details.repository";
import type {
  DeliveryDetailsDTO,
  CreateDeliveryDetailsSchema,
} from "./delivery-details.types";
import { getDeliveryPriceInCents } from "@/lib/utils/delivery";

export class DeliveryDetailsService {
  public static create = async (
    input: CreateDeliveryDetailsSchema,
    orderId: string,
  ): Promise<DeliveryDetailsDTO> => {
    return await DeliveryDetailsRepository.create(input, orderId);
  };

  public static getDeliveryPriceInCents = (
    totalPrice: number,
    postalCode: string,
  ): number => {
    const price = getDeliveryPriceInCents(totalPrice, postalCode);
    if (price === null)
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "postal_code_not_deliverable",
      });
    return price;
  };
}
