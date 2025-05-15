import { ImageAdminSchema } from "@/server/modules/admin/image-admin/image-admin.schema";
import { ImageAdminService } from "@/server/modules/admin/image-admin/image-admin.service";
import { createTRPCRouter } from "@/server/trpc";
import { adminProcedure } from "@/server/trpc/procedures";
import { z } from "zod";

export const imagesRouter = createTRPCRouter({
  getAllImages: adminProcedure
    .input(ImageAdminSchema.getAllImages)
    .query(async ({ input }) => {
      return await ImageAdminService.getAll(input);
    }),

  createMany: adminProcedure
    .input(
      z.object({
        images: z.array(
          z.object({ id: z.string(), name: z.string(), url: z.string() }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.images.createMany({
        data: input.images,
      });
    }),

  removeImages: adminProcedure
    .input(ImageAdminSchema.delete)
    .mutation(async ({ input }) => {
      return await ImageAdminService.delete(input);
    }),
});
