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
import { Prisma } from "@prisma/client";

const collectionScalarFieldEnum = z.enum([
  Prisma.CollectionScalarFieldEnum.createdAt,
  Prisma.CollectionScalarFieldEnum.updatedAt,
  Prisma.CollectionScalarFieldEnum.slug,
]);
const sortOrderEnum = z.enum([Prisma.SortOrder.asc, Prisma.SortOrder.desc]);

export const collectionsRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z
        .object({
          take: z.number().optional(),
          skip: z.number().optional(),
          orderBy: collectionScalarFieldEnum.optional(),
          order: sortOrderEnum.optional(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }): Promise<CollectionWithImageDto[]> => {
      const locale = await getLocale();

      const collections: CollectionFromPrisma[] =
        await ctx.db.collection.findMany({
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
          take: input?.take,
          skip: input?.skip,
          orderBy: {
            [input?.orderBy ?? "updatedAt"]:
              input?.order ?? Prisma.SortOrder.desc,
          },
        });

      return mapCollectionsToDTO(collections);
    }),

  getUniqueBySlug: publicProcedure
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
