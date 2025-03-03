import { Prisma } from "@prisma/client";

export class CollectionAdminQueries {
  public static selectFields = () =>
    Prisma.validator<Prisma.CollectionSelect>()({
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
    });
}
