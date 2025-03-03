import { CollectionSchema } from "@/server/modules/collection/collection.schema";
import { CollectionSevice } from "@/server/modules/collection/collection.service";
import { createTRPCRouter } from "@/server/trpc";
import { publicProcedure } from "@/server/trpc/procedures";
import type { CollectionWithImageDto } from "@/types";

export const collectionsRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(CollectionSchema.getAll)
    .query(async ({ input }): Promise<CollectionWithImageDto[]> => {
      return await CollectionSevice.getAll(input);
    }),

  getBySlug: publicProcedure
    .input(CollectionSchema.getBySlug)
    .query(async ({ input }): Promise<CollectionWithImageDto> => {
      return await CollectionSevice.getBySlugOrThrow(input.slug);
    }),
});
