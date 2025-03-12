import { OrderAdminSchema } from "@/server/modules/admin/order-admin/order-admin.schema";
import { OrderAdminService } from "@/server/modules/admin/order-admin/order-admin.service";
import { createTRPCRouter } from "@/server/trpc";
import { adminProcedure } from "@/server/trpc/procedures";

export const ordersRouter = createTRPCRouter({
  getAll: adminProcedure
    .input(OrderAdminSchema.getAll)
    .query(async ({ input }) => {
      return await OrderAdminService.getAll(input);
    }),

  delete: adminProcedure
    .input(OrderAdminSchema.delete)
    .mutation(async ({ input }) => {
      await OrderAdminService.delete(input.id);
    }),
});
