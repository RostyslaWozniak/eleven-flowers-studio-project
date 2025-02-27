import { Prisma } from "@prisma/client";

export const ADMIN_ORDER_SELECT_FIELDS = Prisma.validator<Prisma.OrderSelect>()(
  {
    id: true,
    createdAt: true,
    paymentStatus: true,
    paymentIntentId: true,
    totalPrice: true,
    orderItems: {
      select: {
        productName: true,
        size: true,
        quantity: true,
      },
    },
    address: {
      select: {
        city: true,
        postCode: true,
        street: true,
      },
    },
    deliveryDetails: {
      select: {
        name: true,
        phone: true,
        flowerMessage: true,
        deliveryDate: true,
        deliveryTime: true,
        description: true,
      },
    },
    contactInfo: {
      select: {
        email: true,
        phone: true,
        name: true,
      },
    },
  },
);
