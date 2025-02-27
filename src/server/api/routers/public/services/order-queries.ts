import { type Locale } from "@/i18n/routing";
import { Prisma } from "@prisma/client";

export const PUBLIC_ORDER_CART_ITEMS_SELECT_FIELDS = ({
  locale,
}: {
  locale: Locale;
}) =>
  Prisma.validator<Prisma.CartItemSelect>()({
    price: true,
    productId: true,
    size: true,
    quantity: true,
    product: {
      select: {
        slug: true,
        images: {
          select: {
            url: true,
          },
          take: 1,
        },
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
  });
