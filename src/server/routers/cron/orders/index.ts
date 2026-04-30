import { withRetry } from "@/lib/utils/with-retry";
import { createTRPCRouter } from "@/server/trpc";
import { cronJobProcedure } from "@/server/trpc/procedures";

export const orderRouter = createTRPCRouter({
  getOrders: cronJobProcedure.query(async ({ ctx }) => {
    const today = new Date();
    const start = new Date(today.setUTCHours(0, 0, 0, 0));
    const end = new Date(today.setUTCHours(23, 59, 59, 999));

    const orders = await withRetry(() => {
      return ctx.db.order.findMany({
        where: {
          deliveryDetails: {
            deliveryDate: {
              gte: start,
              lte: end,
            },
          },
        },
        select: {
          paymentStatus: true,
          deliveryDetails: {
            select: {
              deliveryDate: true,
            },
          },
        },
      });
    }, 5);

    return orders;
  }),
});
