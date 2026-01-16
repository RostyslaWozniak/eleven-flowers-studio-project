import { CollectionQueries } from "../queries/collection.query";
import { CollectionRepository } from "../repositories/collection.repository";
import type {
  CollectionAdminDTO,
  CollectionAdminFromDb,
  GetAllCollectionsSchema,
} from "../types/collection.types";

export class AdminCollectionService {
  public static async getAll(
    input: GetAllCollectionsSchema,
  ): Promise<CollectionAdminDTO[]> {
    const collections = await CollectionRepository.findMany({
      ...input,
      select: CollectionQueries.adminSelectFields,
    });
    return this.mapManyToAdminDto(collections);
  }

  private static mapManyToAdminDto = (
    collections: CollectionAdminFromDb[],
  ): CollectionAdminDTO[] => {
    return collections.map((collection) => ({
      id: collection.id,
      slug: collection.slug,
      name: collection.translations.map(({ name, language }) => ({
        lang: language,
        name,
      })),
      description: collection.translations.map(({ description, language }) => ({
        lang: language,
        description,
      })),
      imageUrl: collection.imageUrl,
    }));
  };
}
