import { ProductAdminSchema } from "@/server/modules/admin/product-admin/product-admin.schema";
import { ProductAdminService } from "@/server/modules/admin/product-admin/product-admin.service";
import type { ProductAdminDTO } from "@/server/modules/admin/product-admin/product-admin.types";
import { createTRPCRouter } from "@/server/trpc";
import { adminProcedure } from "@/server/trpc/procedures";

export const productsRouter = createTRPCRouter({
  getAll: adminProcedure.query(
    async (): Promise<{
      products: ProductAdminDTO[];
      productsCount: number;
    }> => {
      return await ProductAdminService.getAllWithCount();
    },
  ),

  create: adminProcedure
    .input(ProductAdminSchema.create)
    .mutation(async ({ input }) => {
      return await ProductAdminService.create(input);
    }),

  update: adminProcedure
    .input(ProductAdminSchema.update)
    .mutation(async ({ input }) => {
      return await ProductAdminService.update(input.id, input);
    }),

  delete: adminProcedure
    .input(ProductAdminSchema.delete)
    .mutation(async ({ input }) => {
      return await ProductAdminService.delete(input.id);
    }),

  changeStatus: adminProcedure
    .input(ProductAdminSchema.changeStatus)
    .mutation(async ({ input }) => {
      await ProductAdminService.changeStatus(input.id, input.status);
    }),
});
