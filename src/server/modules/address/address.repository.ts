import { db } from "@/server/db";
import type { AddressDTO, CreateAddressSchema } from "./address.types";
import { AddressQueries } from "./address.queries";

export class AddressRepository {
  public static findOne = async ({
    city,
    street,
    postCode,
  }: CreateAddressSchema): Promise<AddressDTO | null> => {
    return await db.address.findFirst({
      where: {
        city,
        street,
        postCode,
      },
      select: AddressQueries.selectFields(),
    });
  };

  public static create = async (input: CreateAddressSchema) => {
    return await db.address.create({
      data: input,
    });
  };
}
