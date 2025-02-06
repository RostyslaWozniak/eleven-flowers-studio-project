import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import { TRPCError } from "@trpc/server";

const requiredString = z.string().trim().min(1, "Required").max(50);

export const orderRouter = createTRPCRouter({
  createNewOrder: publicProcedure
    .input(
      z.object({
        deliveryDate: z.date(),
        deliveryTime: z.string(),
        deliveryMethod: z.enum(["pickup", "delivery"]),
        delivaryDetails: z.string().optional(),
        cartId: z.string(),
        locale: z.string(),
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
        throw new TRPCError({ code: "BAD_REQUEST", message: "Cart is empty" });
      try {
        const order = await ctx.db.order.create({
          data: {
            deliveryDetails: {
              create: {
                deliveryDate: input.deliveryDate,
                deliveryTime: input.deliveryTime,
                description: input.delivaryDetails,
                method: input.deliveryMethod,
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
        return { order, err: null };
      } catch (err) {
        console.error(err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),
});
