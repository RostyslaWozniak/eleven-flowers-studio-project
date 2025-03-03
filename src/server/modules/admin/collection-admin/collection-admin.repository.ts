import { db } from "@/server/db";
import type { Collection } from "@prisma/client";
import { CollectionAdminQueries } from "./collection-admin.queries";
import type {
  CreateCollectionSchema,
  UpdateCollectionSchema,
} from "./collection-admin.types";

export class CollectionAdminRepository {
  public static create = async (
    input: CreateCollectionSchema,
    selectFields?: Partial<Record<keyof Collection, boolean>>,
  ) => {
    return await db.collection.create({
      data: {
        slug: input.slug,
        imageUrl: input.imageUrl,
        translations: {
          create: [
            {
              language: "pl",
              name: input.translations.pl.name,
              description: input.translations.pl.description,
            },
            {
              language: "en",
              name: input.translations.en.name,
              description: input.translations.en.description,
            },
            {
              language: "ru",
              name: input.translations.ru.name,
              description: input.translations.ru.description,
            },
          ],
        },
      },
      select: selectFields ?? CollectionAdminQueries.selectFields(),
    });
  };

  public static findAll = async () => {
    return await db.collection.findMany({
      select: CollectionAdminQueries.selectFields(),
      orderBy: { createdAt: "desc" },
    });
  };

  public static update = async (input: UpdateCollectionSchema) => {
    return await db.collection.update({
      where: {
        id: input.id,
      },
      data: {
        slug: input.slug,
        imageUrl: input.imageUrl,
        translations: {
          deleteMany: {},
          create: [
            {
              language: "pl",
              name: input.translations.pl.name,
              description: input.translations.pl.description,
            },
            {
              language: "en",
              name: input.translations.en.name,
              description: input.translations.en.description,
            },
            {
              language: "ru",
              name: input.translations.ru.name,
              description: input.translations.ru.description,
            },
          ],
        },
      },
    });
  };

  public static delete = async (id: string) => {
    return await db.collection.delete({ where: { id } });
  };

  public static findById = async (
    id: string | undefined,
    selectFields?: Partial<Record<keyof Collection, boolean>>,
  ) => {
    return await db.collection.findUnique({
      where: {
        id,
      },
      select: selectFields ?? CollectionAdminQueries.selectFields(),
    });
  };

  public static findBySlug = async (
    slug: string | undefined,
    selectFields?: Partial<Record<keyof Collection, boolean>>,
  ) => {
    return await db.collection.findUnique({
      where: { slug },
      select: selectFields ?? CollectionAdminQueries.selectFields(),
    });
  };
}
