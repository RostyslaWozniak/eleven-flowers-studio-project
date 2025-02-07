import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import { mapProductToDTO } from "@/lib/utils/dto";
import type { CartItem } from "@/types";
import {
  CART_COOKIE_NAME,
  getCookieValue,
  getLocaleFromCookie,
  setCookieValue,
} from "@/lib/utils/cookies";

const mutateCartSchema = z.object({
  cartItemId: z.string(),
  productId: z.string(),
  size: z.string(),
  quantity: z.number().min(1),
});

export const cartRouter = createTRPCRouter({
  mutateCart: publicProcedure
    .input(mutateCartSchema)
    .mutation(async ({ ctx, input }) => {
      const locale = getLocaleFromCookie(ctx.req);
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
                  language: locale,
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
            where: {
              size: input.size,
            },

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
              language: locale,
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

      const cartId = getCookieValue(ctx.req, CART_COOKIE_NAME);
      // MAP TO DTO
      const product = mapProductToDTO(productFromPrisma);

      // Step 1: Check if cart ID is provided
      let cart;
      if (cartId) {
        cart = await ctx.db.cart.findUnique({
          where: { id: cartId },
          include: { items: true },
        });
      }
      // Step 2: If cart doesn't exist, create a new one
      if (!cart) {
        cart = await ctx.db.cart.create({
          data: {
            items: {
              create: {
                id: input.cartItemId,
                productId: product.id,
                price: product.prices[0]?.price ?? null,
                size: input.size,
                quantity: input.quantity,
              },
            },
          },
          include: { items: true },
        });
        setCookieValue(ctx.resHeaders, CART_COOKIE_NAME, cart.id);
        return { cartId: cart.id, message: "New cart created with item." };
      }

      // Step 3: Check if cart item exists
      const existingCartItem = cart.items.find((item) => {
        return item.id === input.cartItemId;
      });

      if (existingCartItem) {
        // Step 4: Update quantity if item already exists
        await ctx.db.cartItem.update({
          where: { id: existingCartItem.id },
          data: { quantity: input.quantity },
        });
        setCookieValue(ctx.resHeaders, CART_COOKIE_NAME, cart.id);
        return { cartId: cart.id, message: "Cart item updated." };
      } else {
        // Step 5: Create a new cart item if not exists
        await ctx.db.cartItem.create({
          data: {
            id: input.cartItemId,
            cartId: cart.id,
            productId: input.productId,
            size: input.size,
            quantity: input.quantity,
            price: product.prices[0]?.price ?? null,
          },
        });
        setCookieValue(ctx.resHeaders, CART_COOKIE_NAME, cart.id);
        return { cartId: cart.id, message: "New cart item added." };
      }
    }),

  removeCartItem: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.cartItem.delete({
        where: {
          id: input.id,
        },
      });
    }),

  getCartItems: publicProcedure.query(async ({ ctx }): Promise<CartItem[]> => {
    const cartId = getCookieValue(ctx.req, CART_COOKIE_NAME);
    if (!cartId) return [];
    const locale = getLocaleFromCookie(ctx.req);
    const data = await ctx.db.cartItem.findMany({
      where: {
        cartId: cartId,
      },
      select: {
        id: true,
        price: true,
        size: true,
        quantity: true,
        product: {
          select: {
            id: true,
            slug: true,
            images: {
              select: {
                url: true,
              },
            },
            translations: {
              where: {
                language: locale,
              },
              select: {
                name: true,
                description: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!data) return [];

    return data.map((item) => ({
      id: item.id,
      productId: item.product.id,
      productName: item.product.translations[0]?.name ?? "No name",
      slug: item.product.slug,
      price: item.price,
      imageUrl:
        item.product.images[0]?.url ?? "/images/bouquet-placeholder.jpg",
      size: item.size,
      quantity: item.quantity,
    }));
  }),
});
