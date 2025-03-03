import { Prisma } from "@prisma/client";

export class DeliveryDetailsQueries {
  public static selectFields = () =>
    Prisma.validator<Prisma.DeliveryDetailsSelect>()({
      id: true,
      name: true,
      phone: true,
      deliveryDate: true,
      deliveryTime: true,
      description: true,
      flowerMessage: true,
      method: true,
    });
}
