import type { z } from "zod";
import {
  type createCollectionSchema,
  type updateCollectionSchema,
  type deleteCollectionSchema,
} from "@/features/collections/lib/schema";
import { type getAllCollectionsSchema } from "@/features/collections/lib/schema/get-collection.schema";
import { type Prisma } from "@prisma/client";
import { type CollectionQueries } from "../queries/collection.query";

export type CollectionAdminFromDb = {
  translations: {
    description: string;
    name: string;
    language: string;
  }[];
  slug: string;
  imageUrl: string;
  id: string;
};

export type CollectionAdminDTO = {
  id: string;
  slug: string;
  imageUrl: string;
  name: { name: string; lang: string }[];
  description: {
    description: string;
    lang: string;
  }[];
};

export type CollectionFromDb = Prisma.CollectionGetPayload<{
  select: ReturnType<typeof CollectionQueries.getPublicSelectFields>;
}>;

export type CollectionDTO = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  imageUrl: string;
};

export type CreateCollectionSchema = z.infer<typeof createCollectionSchema>;

export type UpdateCollectionSchema = z.infer<typeof updateCollectionSchema>;

export type DeleteCollectionSchema = z.infer<typeof deleteCollectionSchema>;

export type GetAllCollectionsSchema = z.infer<typeof getAllCollectionsSchema>;
