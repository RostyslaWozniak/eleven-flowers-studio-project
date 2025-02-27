import { Prisma } from "@prisma/client";

export const ADMIN_COLLECTION_SELECT_FIELDS = {
  id: true,
  slug: true,
  imageUrl: true,
  translations: {
    select: {
      language: true,
      name: true,
      description: true,
    },
    orderBy: {
      language: Prisma.SortOrder.asc,
    },
  },
} as const;
