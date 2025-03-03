import { db } from "@/server/db";
import type {
  CollectionFromDb,
  GetAllCollectionsSchema,
} from "./collection.types";
import { type Locale } from "@/i18n/routing";
import { CollectionQueries } from "./collection.queries";

export class CollectionRepository {
  public static async findMany(
    { take, skip, orderBy, order }: GetAllCollectionsSchema,
    locale: Locale,
  ): Promise<CollectionFromDb[]> {
    return await db.collection.findMany({
      select: CollectionQueries.selectFields(locale),
      take,
      skip,
      orderBy: {
        [orderBy ?? "updatedAt"]: order ?? "desc",
      },
    });
  }

  public static async findOneBySlug(
    slug: string,
    locale: Locale,
  ): Promise<CollectionFromDb | null> {
    return await db.collection.findUnique({
      where: { slug },
      select: CollectionQueries.selectFields(locale),
    });
  }
}
