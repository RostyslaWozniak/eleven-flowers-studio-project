import { mapCollectionsToDTO } from "@/lib/utils/dto";
import { db } from "@/server/db";
import { type CollectionFromPrisma } from "@/types";
import { type Locale } from "@/i18n/routing";
import { type Prisma } from "@prisma/client";

export async function getAllCollections({
  locale,
  take = 4,
  skip = 0,
  orderBy,
  order,
}: {
  locale: Locale;
  take?: number;
  skip?: number;
  orderBy?: Prisma.ProductOrderByWithRelationInput;
  order?: Prisma.SortOrder;
}) {
  const collections: CollectionFromPrisma[] = await db.collection.findMany({
    select: {
      slug: true,
      imageUrl: true,
      translations: {
        where: {
          language: locale,
        },
        select: {
          name: true,
          description: true,
        },
      },
    },
    take,
    skip,
    orderBy: orderBy ?? { createdAt: order ?? "asc" },
  });

  return mapCollectionsToDTO(collections);
}
