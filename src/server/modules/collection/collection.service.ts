import { validateLang } from "@/lib/utils";
import { getLocale } from "next-intl/server";
import type {
  CollectionDTO,
  CollectionFromDb,
  GetAllCollectionsSchema,
} from "./collection.types";
import { CollectionRepository } from "./collection.repository";
import { TRPCError } from "@trpc/server";

export class CollectionSevice {
  public static async getAll(
    input: GetAllCollectionsSchema,
  ): Promise<CollectionDTO[]> {
    const locale = await getLocale().then(validateLang);
    const collections = await CollectionRepository.findMany(input, locale);
    return this.mapManyCollectionsToDTO(collections);
  }

  public static getBySlug = async (
    slug: string,
  ): Promise<CollectionDTO | null> => {
    const locale = await getLocale().then(validateLang);
    const collection = await CollectionRepository.findOneBySlug(slug, locale);
    return collection ? this.mapOneCollectionToDTO(collection) : null;
  };

  public static getBySlugOrThrow = async (
    slug: string,
  ): Promise<CollectionDTO> => {
    const collection = await this.getBySlug(slug);
    if (!collection)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Collection not found",
      });
    return collection;
  };

  // PRIVATE METHODS AND PROPERTIES

  private static mapOneCollectionToDTO = (
    collection: CollectionFromDb,
  ): CollectionDTO => {
    return {
      id: collection.id,
      slug: collection.slug,
      name: collection.translations.map(({ name }) => name)[0]!,
      imageUrl: collection.imageUrl,
      description:
        collection.translations.map(({ description }) => description)[0] ??
        null,
    };
  };

  private static mapManyCollectionsToDTO = (
    collections: CollectionFromDb[],
  ): CollectionDTO[] => {
    return collections.map((collection) => ({
      id: collection.id,
      slug: collection.slug,
      name: collection.translations.map(({ name }) => name)[0]!,
      description:
        collection.translations.map(({ description }) => description)[0] ??
        null,
      imageUrl: collection.imageUrl,
    }));
  };
}
