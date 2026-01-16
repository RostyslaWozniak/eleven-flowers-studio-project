import { TRPCError } from "@trpc/server";
import { CollectionRepository } from "../repositories/collection.repository";
import type {
  CreateCollectionSchema,
  DeleteCollectionSchema,
  UpdateCollectionSchema,
} from "../types/collection.types";
import { CollectionQueries } from "../queries/collection.query";

export class CollectionService {
  public static create = async (input: CreateCollectionSchema) => {
    const existingCollection = await this.getBySlug(input.slug);

    if (existingCollection) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Collection with this slug already exists",
      });
    }

    return CollectionRepository.create(input, {
      id: true,
    });
  };

  public static update = async (input: UpdateCollectionSchema) => {
    await this.getByIdOrThrow(input.id);
    return CollectionRepository.update(input);
  };

  public static delete = async (input: DeleteCollectionSchema) => {
    return CollectionRepository.delete(input.id);
  };

  public static getByIdOrThrow = async (id: string | undefined) => {
    const collection = await this.getById(id);
    if (!collection)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Collection not found",
      });
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
    return await CollectionRepository.findBySlug(
      slug,
      CollectionQueries.adminSelectFields,
    );
  };
  public static getById = async (id: string | undefined) => {
    return await CollectionRepository.findById(id);
  };
}
