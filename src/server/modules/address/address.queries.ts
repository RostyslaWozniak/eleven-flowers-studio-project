import { Prisma } from "@prisma/client";

export class AddressQueries {
  public static selectFields = () =>
    Prisma.validator<Prisma.AddressSelect>()({
      id: true,
      city: true,
      street: true,
      postCode: true,
    });
}
