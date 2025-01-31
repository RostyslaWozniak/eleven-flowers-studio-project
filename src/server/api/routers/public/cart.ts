import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import { mapProductToDTO } from "@/lib/utils/dto";
import type { CartItem } from "@/types";

const mutateCartSchema = z.object({
  cartId: z.string().uuid().nullable(),
  productId: z.string(),
  size: z.string(),
  quantity: z.number(),
  locale: z.string(),
});

export const cartRouter = createTRPCRouter({
  mutateCart: publicProcedure
    .input(mutateCartSchema)
    .mutation(async ({ ctx, input }) => {
      // CHECK IF PRODUCT EXISTS
      const productFromPrisma = await ctx.db.product.findFirst({
        where: {
          id: input.productId,
        },
        select: {
          id: true,
          slug: true,
          collection: {
            select: {
              slug: true,
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
          images: {
            select: {
              url: true,
            },
          },
          prices: {
            select: {
              price: true,
              size: true,
            },
            orderBy: {
              price: "asc",
            },
          },
          translations: {
            where: {
              language: input.locale,
            },
            select: {
              name: true,
              description: true,
            },
          },
        },
      });

      if (!productFromPrisma) {
        throw new Error("Product not found");
      }

      // MAP TO DTO
      const product = mapProductToDTO(productFromPrisma);

      // CREATE NEW CART IF CART ID = NULL
      if (!input.cartId) {
        const newCart = await ctx.db.cart.create({
          data: {},
        });
        // CREATE CART ITEM
        await ctx.db.cartItem.create({
          data: {
            cartId: newCart.id,
            productId: input.productId,
            size: input.size,
            quantity: input.quantity,
            imageUrl: product.images[0]!,
            price:
              product.prices.find(({ size }) => size === input.size)?.price ??
              0,
            productName: product.name,
          },
        });

        return {
          cartId: newCart.id,
          message: "Cart created. Cart id was null. Cart items created",
        };
      }

      // CHECK IF CART EXISTS
      const cart = await ctx.db.cart.findUnique({
        where: {
          id: input.cartId,
        },
        select: {
          items: true,
          id: true,
        },
      });
      // CHECK IF CART EXISTS BY INPUT ID
      if (!cart) {
        const newCart = await ctx.db.cart.create({
          data: {},
        });

        await ctx.db.cartItem.create({
          data: {
            cartId: newCart.id,
            productId: input.productId,
            size: input.size,
            quantity: input.quantity,
            imageUrl: product.images[0]!,
            price:
              product.prices.find(({ size }) => size === input.size)?.price ??
              0,
            productName: product.name,
          },
        });

        return {
          cartId: newCart.id,
          message: "Cart created. Product added to cart",
        };
      }

      const cartItem = cart.items.find(
        (item) =>
          item.productId === input.productId && item.size === input.size,
      );

      if (!cartItem) {
        await ctx.db.cartItem.create({
          data: {
            cartId: cart.id,
            productId: input.productId,
            size: input.size,
            quantity: input.quantity,
            imageUrl: product.images[0]!,
            price:
              product.prices.find(({ size }) => size === input.size)?.price ??
              0,
            productName: product.name,
          },
        });

        return { cartId: cart.id, message: "CREATED CART ITEM" };
      }

      // If cart item exists update quantity
      await ctx.db.cartItem.update({
        where: {
          id: cartItem.id,
        },
        data: {
          quantity: input.quantity,
        },
      });
      return { cartId: cart.id, message: "UPDATED CART ITEM" };
    }),

  removeCartItem: publicProcedure
    .input(z.object({ cartItemId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.cartItem.delete({
        where: {
          id: input.cartItemId,
        },
      });
    }),

  getCartItems: publicProcedure
    .input(z.object({ cartId: z.string().nullable() }))
    .query(async ({ ctx, input }): Promise<CartItem[]> => {
      // Check if cart id exists
      if (!input.cartId) return [];

      const data = await ctx.db.cartItem.findMany({
        where: {
          cartId: input.cartId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      if (!data) return [];

      return data.map((item) => ({
        id: item.id,
        productId: item.productId,
        productName: item.productName,
        price: item.price,
        imageUrl: item.imageUrl,
        size: item.size,
        quantity: item.quantity,
      }));
    }),
});
