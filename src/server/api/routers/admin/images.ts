import { z } from "zod";
import { adminProcedure, createTRPCRouter } from "../../trpc";
import { utapi } from "@/app/api/uploadthing/utapi";
import { Prisma } from "@prisma/client";

export const imagesRouter = createTRPCRouter({
  getAllImages: adminProcedure.query(async ({ ctx }) => {
    const images = await ctx.db.images.findMany({
      select: {
        id: true,
        name: true,
        url: true,
      },
      orderBy: {
        createdAt: Prisma.SortOrder.desc,
      },
    });
    return images;
  }),

  removeImages: adminProcedure
    .input(z.array(z.string()))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.images.deleteMany({
        where: {
          id: {
            in: input,
          },
        },
      });
      await utapi.deleteFiles(input);
    }),
});
