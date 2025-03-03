import { ImageAdminSchema } from "@/server/modules/admin/image-admin/image-admin.schema";
import { ImageAdminService } from "@/server/modules/admin/image-admin/image-admin.service";
import { createTRPCRouter } from "@/server/trpc";
import { adminProcedure } from "@/server/trpc/procedures";

export const imagesRouter = createTRPCRouter({
  getAllImages: adminProcedure.query(async () => {
    return await ImageAdminService.getAll();
  }),

  removeImages: adminProcedure
    .input(ImageAdminSchema.delete)
    .mutation(async ({ input }) => {
      return await ImageAdminService.delete(input);
    }),
});
