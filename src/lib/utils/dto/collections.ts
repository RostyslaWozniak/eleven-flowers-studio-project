import type { CollectionDTO, CollectionFromPrisma } from "@/types";

export const mapCollectionsToDTO = (
  collections: CollectionFromPrisma[],
): CollectionDTO[] => {
  return collections.map((collection) => ({
    slug: collection.slug,
    name: collection.translations.map(({ name }) => name)[0]!,
    description:
      collection.translations.map(({ description }) => description)[0] ?? null,
  }));
};

export const mapCollectionToDTO = (
  collection: CollectionFromPrisma,
): CollectionDTO => {
  return {
    slug: collection.slug,
    name: collection.translations.map(({ name }) => name)[0]!,
    description:
      collection.translations.map(({ description }) => description)[0] ?? null,
  };
};
