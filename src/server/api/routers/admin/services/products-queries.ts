import { Prisma } from "@prisma/client";

export const ADMIN_PRODUCT_SELECT_FIELDS = {
  id: true,
  slug: true,
  collection: {
    select: {
      slug: true,
      translations: {
        where: {
          language: "en",
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
    select: {
      name: true,
      description: true,
      language: true,
    },
    orderBy: {
      name: Prisma.SortOrder.asc,
    },
  },
};
