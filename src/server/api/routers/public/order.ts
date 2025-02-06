import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { dateAndMethodFormSchema } from "@/lib/validation/date-and-method-form-schema";
import { deliveryFormSchema } from "@/lib/validation/delivery-form-schema";

export const orderRouter = createTRPCRouter({
  createOrderWithDelivery: publicProcedure
    .input(
      z.object({
        cartId: z.string(),
        locale: z.string(),
        dateAndMethodData: dateAndMethodFormSchema,
        addressDetails: deliveryFormSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const cartItems = await ctx.db.cartItem.findMany({
        where: {
          cartId: input.cartId,
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
                  language: input.locale,
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
          message: "Cart is empty",
        });
      let contactInfoId: string;

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

      try {
        const order = await ctx.db.order.create({
          data: {
            deliveryDetails: {
              create: {
                deliveryDate: input.dateAndMethodData.date,
                deliveryTime: input.dateAndMethodData.time,
                description: input.dateAndMethodData.description,
                method: input.dateAndMethodData.deliveryMethod,
              },
            },
            address: {
              create: {
                city: input.addressDetails.city,
                street: input.addressDetails.address,
                postCode: input.addressDetails.postalCode,
              },
            },
            contactInfoId: contactInfoId,
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

        await ctx.db.cart.delete({
          where: {
            id: input.cartId,
          },
        });
        return { orderId: order.id, err: null };
      } catch (err) {
        console.error(err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),
});
