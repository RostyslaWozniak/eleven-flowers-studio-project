import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { dateAndMethodFormSchema } from "@/lib/validation/date-and-method-form-schema";
import { deliveryFormSchema } from "@/lib/validation/delivery-form-schema";
import {
  CART_COOKIE_NAME,
  getCookieValue,
  getLocaleFromCookie,
  ORDER_COOKIE_NAME,
  setCookieValue,
} from "@/lib/utils/cookies";

export const orderRouter = createTRPCRouter({
  createOrderWithDelivery: publicProcedure
    .input(
      z
        .object({
          dateAndMethodData: dateAndMethodFormSchema,
          addressDetails: deliveryFormSchema,
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
        select: {
          price: true,
          productId: true,
          size: true,
          quantity: true,
          product: {
            select: {
              slug: true,
              images: {
                select: {
                  url: true,
                },
                take: 1,
              },
              translations: {
                where: {
                  language: locale,
                },
                select: {
                  name: true,
                },
              },
            },
          },
        },
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
          email: input.addressDetails.email,
        },
      });

      if (existingContactInfo) {
        contactInfoId = existingContactInfo.id;
      } else {
        const newContactInfo = await ctx.db.contactInfo.create({
          data: {
            firsName: input.addressDetails.firstName,
            lastName: input.addressDetails.lastName,
            email: input.addressDetails.email,
          },
        });
        contactInfoId = newContactInfo.id;
      }

      // 3. check if address exists, if not create
      let addressId: string;
      const existingAddress = await ctx.db.address.findFirst({
        where: {
          city: input.addressDetails.city,
          street: input.addressDetails.address,
          postCode: input.addressDetails.postalCode,
        },
      });
      if (existingAddress) {
        addressId = existingAddress.id;
      } else {
        const address = await ctx.db.address.create({
          data: {
            city: input.addressDetails.city,
            street: input.addressDetails.address,
            postCode: input.addressDetails.postalCode,
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
            addressId,
            totalPrice,
            deliveryDetails: {
              create: {
                deliveryDate: input.dateAndMethodData.date,
                deliveryTime: input.dateAndMethodData.time,
                description: input.dateAndMethodData.description,
                method: input.dateAndMethodData.deliveryMethod,
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
    if (!orderId) return [];

    const locale = getLocaleFromCookie(ctx.req);

    const order = await ctx.db.order.findUnique({
      where: {
        id: orderId,
      },
      select: {
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
    if (!order) return [];
    return order.orderItems.map((item) => ({
      id: item.id,
      productName: item.product.translations[0]?.name ?? item.productName,
      slug: item.slug,
      price: item.price,
      imageUrl: item.imageUrl,
      size: item.size,
      quantity: item.quantity,
    }));
  }),
});
