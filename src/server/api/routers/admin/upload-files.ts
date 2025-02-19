import { utapi } from "@/app/api/uploadthing/utapi";
import { env } from "@/env";

import {
  adminProcedure,
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const uploadFilesRouter = createTRPCRouter({
  getAllImages: publicProcedure.query(async () => {
    const { files } = await utapi.listFiles();
    if (!files) throw new TRPCError({ code: "NOT_FOUND" });
    const images = files.map((file) => {
      return {
        id: file.key,
        name: file.name,
        url: `https://${env.NEXT_PUBLIC_UPLOADTHING_APP_ID}.ufs.sh/f/${file.key}`,
      };
    });
    // const images = await ctx.db.productImage.findMany({
    //   select: {
    //     id: true,
    //     name: true,
    //     url: true,
    //   },
    // });
    return images;
  }),

  // uploadimages: adminProcedure
  //   .input(z.array(z.string()))
  //   .mutation(async ({ input }) => {
  //     await utapi.uploadFiles(input);
  //   }),

  removeImages: adminProcedure
    .input(z.array(z.string()))
    .mutation(async ({ input }) => {
      await utapi.deleteFiles(input);
    }),
});
