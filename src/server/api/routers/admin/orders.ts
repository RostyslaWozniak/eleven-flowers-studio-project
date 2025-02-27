import { z } from "zod";
import { adminProcedure, createTRPCRouter } from "../../trpc";
import { Prisma } from "@prisma/client";
import { ADMIN_ORDER_SELECT_FIELDS } from "./services/orders-queries";
import { type AdminOrderDto } from "./types/order-types";

export const orderRouter = createTRPCRouter({
  getAll: adminProcedure.query(async ({ ctx }): Promise<AdminOrderDto[]> => {
    const orders = await ctx.db.order.findMany({
      select: ADMIN_ORDER_SELECT_FIELDS,
      orderBy: {
        createdAt: Prisma.SortOrder.desc,
      },
    });
    return orders;
  }),

  delete: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.order.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
