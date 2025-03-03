import type { z } from "zod";
import type { CollectionAdminSchema } from "./collection-admin.schema";

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

export type CreateCollectionSchema = z.infer<
  typeof CollectionAdminSchema.create
>;

export type UpdateCollectionSchema = z.infer<
  typeof CollectionAdminSchema.update
>;

export type DeleteCollectionSchema = z.infer<
  typeof CollectionAdminSchema.delete
>;
