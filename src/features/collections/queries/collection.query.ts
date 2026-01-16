import { type Locale } from "@/i18n/routing";
import { Prisma } from "@prisma/client";

export class CollectionQueries {
  public static adminSelectFields = Prisma.validator<Prisma.CollectionSelect>()(
    {
      id: true,
      slug: true,
      imageUrl: true,
      translations: {
        select: {
          language: true,
          name: true,
          description: true,
        },
      },
    },
  );

  public static getPublicSelectFields(locale: Locale) {
    return Prisma.validator<Prisma.CollectionSelect>()({
      id: true,
      slug: true,
      imageUrl: true,
      translations: {
        select: {
          name: true,
          description: true,
        },
        where: {
          language: locale,
        },
      },
    });
  }
}
