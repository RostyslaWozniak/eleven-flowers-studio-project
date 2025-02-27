import { type Locale } from "@/i18n/routing";
import type {
  AdminCollectionDto,
  PrismaGetAdminCollections,
} from "../types/collection-types";

export const mapAdminCollectionToDto = (
  collection: PrismaGetAdminCollections,
): AdminCollectionDto => {
  return {
    id: collection.id,
    slug: collection.slug,
    name: collection.translations.map(({ name, language }) => ({
      lang: language as Locale,
      name,
    })),
    description: collection.translations.map(({ description, language }) => ({
      lang: language as Locale,
      description,
    })),
    imageUrl: collection.imageUrl,
  };
};

export const mapAdminCollectionsToDto = (
  collections: PrismaGetAdminCollections[],
): AdminCollectionDto[] => {
  return collections.map((collection) => ({
    id: collection.id,
    slug: collection.slug,
    name: collection.translations.map(({ name, language }) => ({
      lang: language as Locale,
      name,
    })),
    description: collection.translations.map(({ description, language }) => ({
      lang: language as Locale,
      description,
    })),
    imageUrl: collection.imageUrl,
  }));
};
