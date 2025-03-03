import { Prisma } from "@prisma/client";

export class OrderQueries {
  public static selectFields = (): Prisma.OrderSelect =>
    Prisma.validator<Prisma.OrderSelect>()({
      id: true,
      totalPrice: true,
      deliveryPrice: true,
      paymentStatus: true,
      contactInfoId: true,
      orderItems: {
        select: {
          id: true,
          productId: true,
          size: true,
          quantity: true,
          productName: true,
          imageUrl: true,
          slug: true,
          price: true,
        },
      },
    });
}
