import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import type {
  CollectionDTO,
  CollectionFromPrisma,
  CollectionWithImageDto,
} from "@/types";
import { mapCollectionsToDTO, mapCollectionToDTO } from "@/lib/utils/dto";
import { TRPCError } from "@trpc/server";
import { getLocale } from "next-intl/server";

export const collectionsRouter = createTRPCRouter({
  getAllCollections: publicProcedure
    .input(z.object({ take: z.number().optional().default(4) }))
    .query(async ({ ctx, input }): Promise<CollectionWithImageDto[]> => {
      const locale = await getLocale();

      const collections: CollectionFromPrisma[] =
        await ctx.db.collection.findMany({
          select: {
            slug: true,
            imageUrl: true,
            translations: {
              where: {
                language: locale,
              },
              select: {
                name: true,
                description: true,
              },
            },
          },
          take: input.take,
          orderBy: {
            createdAt: "asc",
          },
        });

      return mapCollectionsToDTO(collections);
    }),

  getUniqCollectionBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }): Promise<CollectionDTO> => {
      const locale = await getLocale();

      const collection: CollectionFromPrisma | null =
        await ctx.db.collection.findUnique({
          where: {
            slug: input.slug,
          },
          select: {
            slug: true,
            imageUrl: true,
            translations: {
              select: {
                name: true,
                description: true,
              },
              where: {
                language: locale,
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
