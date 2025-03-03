import { CollectionAdminSchema } from "@/server/modules/admin/collection-admin/collection-admin.schema";
import { CollectionAdminService } from "@/server/modules/admin/collection-admin/collection-admin.service";
import { createTRPCRouter } from "@/server/trpc";
import { adminProcedure } from "@/server/trpc/procedures";

export const collectionsRouter = createTRPCRouter({
  create: adminProcedure
    .input(CollectionAdminSchema.create)
    .mutation(async ({ input }) => {
      return await CollectionAdminService.create(input);
    }),

  getAll: adminProcedure.query(async () => {
    return await CollectionAdminService.getAll();
  }),

  update: adminProcedure
    .input(CollectionAdminSchema.update)
    .mutation(async ({ input }) => {
      return await CollectionAdminService.update(input);
    }),

  delete: adminProcedure
    .input(CollectionAdminSchema.delete)
    .mutation(async ({ input }) => {
      await CollectionAdminService.delete(input);
    }),
});
