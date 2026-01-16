import {
  createCollectionSchema,
  deleteCollectionSchema,
  updateCollectionSchema,
} from "@/features/collections/lib/schema";
import { AdminCollectionService } from "@/features/collections/services/admin-collection.service";
import { CollectionService } from "@/features/collections/services/collection.service";
import { createTRPCRouter } from "@/server/trpc";
import { adminProcedure } from "@/server/trpc/procedures";

export const collectionsRouter = createTRPCRouter({
  create: adminProcedure
    .input(createCollectionSchema)
    .mutation(async ({ input }) => {
      return await CollectionService.create(input);
    }),
  getAll: adminProcedure.query(async () => {
    return await AdminCollectionService.getAll({
      orderBy: "updatedAt",
      order: "desc",
    });
  }),
  update: adminProcedure
    .input(updateCollectionSchema)
    .mutation(async ({ input }) => {
      return await CollectionService.update(input);
    }),
  delete: adminProcedure
    .input(deleteCollectionSchema)
    .mutation(async ({ input }) => {
      await CollectionService.delete(input);
    }),
});
