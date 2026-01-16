import { db } from "@/server/db";
import { type Prisma, type Collection } from "@prisma/client";
import type {
  CollectionFromDb,
  CreateCollectionSchema,
  GetAllCollectionsSchema,
  UpdateCollectionSchema,
} from "../types/collection.types";
import { routing } from "@/i18n/routing";

export class CollectionRepository {
  public static async findMany({
    take,
    skip,
    orderBy,
    order,
    select,
  }: GetAllCollectionsSchema & { select: Prisma.CollectionSelect }) {
    return await db.collection.findMany({
      select,
      take,
      skip,
      orderBy: {
        [orderBy ?? "updatedAt"]: order ?? "desc",
      },
    });
  }

  public static create = async (
    input: CreateCollectionSchema,
    select?: Prisma.CollectionSelect,
  ) => {
    return await db.collection.create({
      data: {
        slug: input.slug,
        imageUrl: input.imageUrl,
        translations: {
          create: routing.locales.map((lang) => ({
            language: lang,
            name: input.translations[lang].name,
            description: input.translations[lang].description,
          })),
        },
      },
      select,
    });
  };

  public static update = async (
    input: UpdateCollectionSchema,
    select?: Prisma.CollectionSelect,
  ) => {
    return await db.collection.update({
      where: {
        id: input.id,
      },
      select,
      data: {
        slug: input.slug,
        imageUrl: input.imageUrl,
        translations: {
          deleteMany: {},
          create: routing.locales.map((lang) => ({
            language: lang,
            name: input.translations[lang].name,
            description: input.translations[lang].description,
          })),
        },
      },
    });
  };

  public static delete = async (
    id: string,
    select?: Prisma.CollectionSelect,
  ) => {
    return await db.collection.delete({ where: { id }, select });
  };

  public static findById = async (
    id: string | undefined,
    selectFields?: Partial<Record<keyof Collection, boolean>>,
  ) => {
    return await db.collection.findUnique({
      where: {
        id,
      },
      select: selectFields,
    });
  };

  public static findBySlug = async (
    slug: string | undefined,
    selectFields: Prisma.CollectionSelect,
  ): Promise<CollectionFromDb | null> => {
    return await db.collection.findUnique({
      where: { slug },
      select: selectFields,
    });
  };
}
