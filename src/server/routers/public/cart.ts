import type { CartItemDTO } from "@/server/modules/cart-item/cart-items.typs";
import { CartSchema } from "@/server/modules/cart/cart.schema";
import { CartService } from "@/server/modules/cart/cart.service";
import { createTRPCRouter } from "@/server/trpc";
import { publicProcedure } from "@/server/trpc/procedures";
import { z } from "zod";

export const cartRouter = createTRPCRouter({
  mutateCart: publicProcedure
    .input(CartSchema.mutateCart)
    .mutation(async ({ ctx, input }) => {
      return await CartService.mutateCart(ctx.req, ctx.resHeaders, input);
    }),

  getCartItems: publicProcedure.query(
    async ({ ctx }): Promise<CartItemDTO[]> => {
      return await CartService.getCartItems(ctx.req);
    },
  ),

  removeCartItem: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ input }) => {
      return await CartService.removeCartItem(input.id);
    }),
});
