import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import type { CollectionDTO, CollectionFromPrisma } from "@/types";
import { mapCollectionsToDTO, mapCollectionToDTO } from "@/lib/utils/dto";
import { TRPCError } from "@trpc/server";

const localeSchema = z.object({
  locale: z.string(),
});

const uniqCollectionBySlugSchema = localeSchema.extend({
  slug: z.string(),
});

export const collectionsRouter = createTRPCRouter({
  getAllCollections: publicProcedure
    .input(localeSchema)
    .query(async ({ ctx, input }): Promise<CollectionDTO[]> => {
      const collections: CollectionFromPrisma[] =
        await ctx.db.collection.findMany({
          select: {
            slug: true,
            translations: {
              where: {
                language: input.locale,
              },
              select: {
                name: true,
                description: true,
              },
            },
          },
        });

      return mapCollectionsToDTO(collections);
    }),

  getUniqCollectionBySlug: publicProcedure
    .input(uniqCollectionBySlugSchema)
    .query(async ({ ctx, input }): Promise<CollectionDTO> => {
      const collection: CollectionFromPrisma | null =
        await ctx.db.collection.findUnique({
          where: {
            slug: input.slug,
          },
          select: {
            slug: true,
            translations: {
              select: {
                name: true,
                description: true,
              },
              where: {
                language: input.locale,
              },
            },
          },
        });

      if (!collection) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Collection not found",
        });
      }

      return mapCollectionToDTO(collection);
    }),
});
