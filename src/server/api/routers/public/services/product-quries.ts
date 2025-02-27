import { type Locale } from "@/i18n/routing";
import { Prisma } from "@prisma/client";

export const PUBLIC_PRODUCT_SELECT_FIELDS = ({ locale }: { locale: Locale }) =>
  Prisma.validator<Prisma.ProductSelect>()({
    id: true,
    slug: true,
    collection: {
      select: {
        slug: true,
        translations: {
          where: {
            language: locale,
          },
          select: {
            name: true,
          },
        },
      },
    },
    images: {
      select: {
        url: true,
      },
    },

    prices: {
      select: {
        price: true,
        size: true,
      },
      orderBy: {
        price: Prisma.SortOrder.asc,
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
  });
