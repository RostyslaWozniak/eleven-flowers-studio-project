import { schemaSlug } from "@/lib/validation/schemas";
import { Prisma } from "@prisma/client";
import { z } from "zod";

const collectionScalarFieldEnum = z.enum([
  Prisma.CollectionScalarFieldEnum.createdAt,
  Prisma.CollectionScalarFieldEnum.updatedAt,
  Prisma.CollectionScalarFieldEnum.slug,
]);

const sortOrderEnum = z.enum([Prisma.SortOrder.asc, Prisma.SortOrder.desc]);

export const getAllCollectionsSchema = z.object({
  take: z.number().optional(),
  skip: z.number().optional(),
  orderBy: collectionScalarFieldEnum.optional(),
  order: sortOrderEnum.optional(),
});

export const getCollectionBySlugSchema = z.object({ slug: schemaSlug });
