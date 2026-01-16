import {
  getAllCollectionsSchema,
  getCollectionBySlugSchema,
} from "@/features/collections/lib/schema/get-collection.schema";
import { PublicCollectionService } from "@/features/collections/services/public-collection.service";
import type { CollectionDTO } from "@/features/collections/types/collection.types";
import { createTRPCRouter } from "@/server/trpc";
import { publicProcedure } from "@/server/trpc/procedures";

export const collectionsRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(getAllCollectionsSchema)
    .query(async ({ input }): Promise<CollectionDTO[]> => {
      return await PublicCollectionService.getAll(input);
    }),

  getBySlug: publicProcedure
    .input(getCollectionBySlugSchema)
    .query(async ({ input }): Promise<CollectionDTO> => {
      return await PublicCollectionService.getBySlugOrThrow(input.slug);
    }),
});
