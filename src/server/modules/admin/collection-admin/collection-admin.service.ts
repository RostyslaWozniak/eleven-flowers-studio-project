import { TRPCError } from "@trpc/server";
import { CollectionAdminRepository } from "./collection-admin.repository";
import type {
  CollectionAdminDTO,
  CollectionAdminFromDb,
  CreateCollectionSchema,
  DeleteCollectionSchema,
  UpdateCollectionSchema,
} from "./collection-admin.types";

export class CollectionAdminService {
  public static create = async (input: CreateCollectionSchema) => {
    const existingCollection = await this.getBySlug(input.slug);
    if (existingCollection) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Collection with this slug already exists",
      });
    }

    const collection = await CollectionAdminRepository.create(input, {
      id: true,
    });

    return collection.id;
  };

  public static getAll = async () => {
    const collections = await CollectionAdminRepository.findAll();
    return this.mapManyToDto(collections);
  };

  public static update = async (input: UpdateCollectionSchema) => {
    await this.getByIdOrThrow(input.id);

    const collection = await CollectionAdminRepository.update(input);

    return collection.id;
  };

  public static delete = async (input: DeleteCollectionSchema) => {
    await CollectionAdminRepository.delete(input.id);
  };

  public static getByIdOrThrow = async (id: string | undefined) => {
    const collection = await this.getById(id);
    if (!collection) throw new TRPCError({ code: "NOT_FOUND" });
    return collection;
  };
  public static getBySlugOrThrow = async (slug: string | undefined) => {
    const collection = await this.getBySlug(slug);
    if (!collection)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Collection not found",
      });
    return collection;
  };

  public static getBySlug = async (slug: string | undefined) => {
    return await CollectionAdminRepository.findBySlug(slug);
  };
  public static getById = async (id: string | undefined) => {
    return await CollectionAdminRepository.findById(id);
  };

  private static mapManyToDto = (
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
