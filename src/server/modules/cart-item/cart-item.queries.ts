import { type Locale } from "@/i18n/routing";
import { Prisma } from "@prisma/client";

export class CartItemQueries {
  public static selectFields = (locale: Locale) =>
    Prisma.validator<Prisma.CartItemSelect>()({
      id: true,
      price: true,
      size: true,
      quantity: true,
      product: {
        select: {
          id: true,
          slug: true,
          images: {
            select: {
              url: true,
            },
          },
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
      },
    });
}
