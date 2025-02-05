import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import { mapProductToDTO } from "@/lib/utils/dto";
import type { CartItem } from "@/types";

const mutateCartSchema = z.object({
  cartItemId: z.string(),
  cartId: z.string().uuid().nullable(),
  productId: z.string(),
  size: z.string(),
  quantity: z.number().min(1),
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

      // Step 1: Check if cart ID is provided
      let cart;
      if (input.cartId) {
        cart = await ctx.db.cart.findUnique({
          where: { id: input.cartId },
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
                productName: product.name,
                slug: product.slug,
                price: product.prices[0]?.price ?? null,
                size: input.size,
                quantity: input.quantity,
                imageUrl:
                  product.images[0] ?? "/images/bouquet-placeholder.jpg",
              },
            },
          },
          include: { items: true },
        });
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

        return { cartId: cart.id, message: "Cart item updated." };
      } else {
        console.log({ cartItemId: input.cartItemId });
        // Step 5: Create a new cart item if not exists
        await ctx.db.cartItem.create({
          data: {
            id: input.cartItemId,
            cartId: cart.id,
            productId: input.productId,
            productName: product.name,
            size: input.size,
            quantity: input.quantity,
            slug: product.slug,
            price: product.prices[0]?.price ?? null,
            imageUrl: product.images[0] ?? "/images/bouquet-placeholder.jpg",
          },
        });

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
        slug: item.slug,
        price: item.price,
        imageUrl: item.imageUrl,
        size: item.size,
        quantity: item.quantity,
      }));
    }),
});
