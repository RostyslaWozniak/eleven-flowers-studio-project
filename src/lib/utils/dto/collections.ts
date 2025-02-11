import type {
  CollectionDTO,
  CollectionFromPrisma,
  CollectionWithImageDto,
} from "@/types";

export const mapCollectionsToDTO = (
  collections: CollectionFromPrisma[],
): CollectionWithImageDto[] => {
  return collections.map((collection) => ({
    slug: collection.slug,
    name: collection.translations.map(({ name }) => name)[0]!,
    description:
      collection.translations.map(({ description }) => description)[0] ?? null,
    imageUrl: collection.imageUrl,
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
