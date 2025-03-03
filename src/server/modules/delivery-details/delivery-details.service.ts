import { TRPCError } from "@trpc/server";
import { DeliveryDetailsRepository } from "./delivery-details.repository";
import type {
  DeliveryDetailsDTO,
  CreateDeliveryDetailsSchema,
} from "./delivery-details.types";
import {
  DELIVERY_ZONES,
  MIN_FREE_DELIVERY_PRICE_IN_CENTS,
  POSTAL_CODE_SCHEMA,
} from "@/lib/utils/delivery";

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
  ): { price: number; message: string } => {
    if (!POSTAL_CODE_SCHEMA.test(postalCode)) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "invalid_postal_code",
      });
    }

    const prefix = parseInt(postalCode.split("-")[0]!, 10); // Extract first two digits

    const res = DELIVERY_ZONES[prefix];

    if (!res)
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "postal_code_not_deliverable",
      });

    if (totalPrice >= MIN_FREE_DELIVERY_PRICE_IN_CENTS) {
      return {
        price: 0,
        message: "free_delivery",
      };
    }
    return res;
  };
}
