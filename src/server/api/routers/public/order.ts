import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { recipientFormSchema } from "@/lib/validation/recipient-form-schema";
import { orderingFormSchema } from "@/lib/validation/ordering-form-schema";
import {
  CART_COOKIE_NAME,
  deleteCookieValue,
  getCookieValue,
  getLocaleFromCookie,
  ORDER_COOKIE_NAME,
  setCookieValue,
} from "@/lib/utils/cookies";
import { PUBLIC_ORDER_CART_ITEMS_SELECT_FIELDS } from "./services/order-queries";

export const orderRouter = createTRPCRouter({
  createOrderWithDelivery: publicProcedure
    .input(
      z
        .object({
          recipientFormData: recipientFormSchema,
          orderingFormData: orderingFormSchema,
        })
        .catch(() => {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "form_validation_error",
          });
        }),
    )
    .mutation(async ({ ctx, input }) => {
      const cartId = getCookieValue(ctx.req, CART_COOKIE_NAME);
      if (!cartId)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "cart_is_empty",
        });

      const locale = getLocaleFromCookie(ctx.req);

      //1. get cart items
      const cartItems = await ctx.db.cartItem.findMany({
        where: {
          cartId: cartId,
        },
        select: PUBLIC_ORDER_CART_ITEMS_SELECT_FIELDS({ locale }),
      });

      if (cartItems.length === 0)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "cart_is_empty",
        });
      let contactInfoId: string;
      //2. check if contact info exists, if not create
      const existingContactInfo = await ctx.db.contactInfo.findFirst({
        where: {
          email: input.orderingFormData.email,
        },
      });

      if (existingContactInfo) {
        contactInfoId = existingContactInfo.id;
        if (
          (input.orderingFormData.name && !existingContactInfo.name) ||
          (input.orderingFormData.phone && !existingContactInfo.phone)
        ) {
          const updatedContactIngo = {
            name: input.orderingFormData.name ?? existingContactInfo.name,
            phone: input.orderingFormData.phone ?? existingContactInfo.phone,
          };

          await ctx.db.contactInfo.update({
            where: {
              id: contactInfoId,
            },
            data: updatedContactIngo,
          });
        }
      } else {
        const newContactInfo = await ctx.db.contactInfo.create({
          data: {
            name: input.orderingFormData.name,
            email: input.orderingFormData.email,
            phone: input.orderingFormData.phone,
          },
        });
        contactInfoId = newContactInfo.id;
      }

      // 3. check if address exists, if not create
      let addressId: string;
      const existingAddress = await ctx.db.address.findFirst({
        where: {
          city: input.recipientFormData.city,
          street: input.recipientFormData.address,
          postCode: input.recipientFormData.postalCode,
        },
      });
      if (existingAddress) {
        addressId = existingAddress.id;
      } else {
        const address = await ctx.db.address.create({
          data: {
            city: input.recipientFormData.city,
            street: input.recipientFormData.address,
            postCode: input.recipientFormData.postalCode,
          },
        });
        addressId = address.id;
      }

      //3.  create order
      const totalPrice = cartItems.reduce((total, item) => {
        if (item.price == null || item.price <= 0) {
          throw new Error(
            `Invalid price for item: ${item.product.translations[0]?.name}`,
          );
        }
        return total + item.price * item.quantity;
      }, 0);
      try {
        const order = await ctx.db.order.create({
          data: {
            contactInfoId,
            locale,
            addressId,
            totalPrice,
            deliveryDetails: {
              create: {
                name: input.orderingFormData.name,
                phone: input.orderingFormData.phone,
                deliveryDate: input.orderingFormData.date,
                deliveryTime: input.orderingFormData.time,
                description: input.orderingFormData.description,
                flowerMessage: input.recipientFormData.flowerMessage,
                method: "delivery",
              },
            },
            orderItems: {
              createMany: {
                data: cartItems.map((item) => ({
                  productId: item.productId,
                  size: item.size,
                  quantity: item.quantity,
                  productName:
                    item.product.translations[0]?.name ?? "Unnamed Product",
                  imageUrl:
                    item.product.images[0]?.url ??
                    "/images/bouquet-placeholder.jpg",
                  price: item.price,
                  slug: item.product.slug,
                })),
              },
            },
          },
        });

        //4.  remove all cart items from cart
        await ctx.db.cartItem.deleteMany({
          where: {
            cartId,
          },
        });
        //5. set order id to cookie
        setCookieValue(ctx.resHeaders, ORDER_COOKIE_NAME, order.id);
        return { orderId: order.id, message: "order_created" };
      } catch {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),

  getOrderById: publicProcedure.query(async ({ ctx }) => {
    const orderId = getCookieValue(ctx.req, ORDER_COOKIE_NAME);
    if (!orderId)
      throw new TRPCError({ code: "BAD_REQUEST", message: "order_not_found" });

    const locale = getLocaleFromCookie(ctx.req);

    const order = await ctx.db.order.findUnique({
      where: {
        id: orderId,
      },
      select: {
        totalPrice: true,
        orderItems: {
          select: {
            product: {
              select: {
                translations: {
                  where: {
                    language: locale,
                  },
                  select: {
                    name: true,
                  },
                  take: 1,
                },
              },
            },
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
      },
    });
    if (!order)
      throw new TRPCError({ code: "BAD_REQUEST", message: "order_not_found" });
    return {
      orderItems: order.orderItems.map((item) => ({
        id: item.id,
        productName: item.product.translations[0]?.name ?? item.productName,
        slug: item.slug,
        price: item.price,
        imageUrl: item.imageUrl,
        size: item.size,
        quantity: item.quantity,
      })),
      totalPrice: order.totalPrice,
    };
  }),

  removeOrderFromCoockie: publicProcedure.query(async ({ ctx }) => {
    const orderId = getCookieValue(ctx.req, ORDER_COOKIE_NAME);
    if (orderId) {
      deleteCookieValue(ctx.resHeaders, ORDER_COOKIE_NAME);
      await ctx.db.order.delete({
        where: {
          id: orderId,
        },
      });
    }
    return null;
  }),
});
