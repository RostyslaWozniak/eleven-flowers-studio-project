import type { z } from "zod";
import type { CollectionSchema } from "./collection.schema";
import type { Prisma } from "@prisma/client";
import type { CollectionQueries } from "./collection.queries";

export type CollectionFromDb = Prisma.CollectionGetPayload<{
  select: ReturnType<typeof CollectionQueries.selectFields>;
}>;

export type CollectionDTO = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  imageUrl: string;
};

export type GetAllCollectionsSchema = z.infer<typeof CollectionSchema.getAll>;

export type GetCollectionBySlugSchema = z.infer<
  typeof CollectionSchema.getBySlug
>;
