import { db } from "@/server/db";
import { OrderQueries } from "./order.queries";
import type { OrderFromDb } from "./order.types";
import type { CartItemDTO } from "../cart-item/cart-items.typs";
import { type Locale } from "@/i18n/routing";
import type { CreateDeliveryDetailsSchema } from "../delivery-details/delivery-details.types";

export class OrderRepository {
  public static create = async ({
    locale,
    contactInfoId,
    addressId,
    totalPrice,
    deliveryPrice,
    cartItems,
    deliveryDetails,
  }: {
    locale: Locale;
    contactInfoId: string;
    addressId: string;
    totalPrice: number;
    deliveryPrice: number;
    cartItems: CartItemDTO[];
    deliveryDetails: CreateDeliveryDetailsSchema;
  }) => {
    return await db.order.create({
      data: {
        locale,
        contactInfoId,
        addressId,
        totalPrice,
        deliveryPrice,
        deliveryDetails: {
          create: deliveryDetails,
        },
        orderItems: {
          createMany: {
            data: cartItems.map((item) => ({
              productId: item.productId,
              size: item.size,
              quantity: item.quantity,
              productName: item.productName,
              imageUrl: item.imageUrl,
              price: item.price,
              slug: item.slug,
            })),
          },
        },
      },
    });
  };
  public static getById = async (
    orderId: string,
  ): Promise<OrderFromDb | null> => {
    return await db.order.findUnique({
      where: {
        id: orderId,
      },
      select: OrderQueries.selectFields(),
    });
  };

  public static remove = async (orderId: string): Promise<null> => {
    try {
      await db.order.delete({
        where: {
          id: orderId,
          paymentStatus: "PENDING",
        },
      });
      return null;
    } catch {
      return null;
    }
  };
}
