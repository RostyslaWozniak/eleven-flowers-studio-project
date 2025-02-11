import type { Prisma } from "@prisma/client";

export type CollectionFromPrisma = Prisma.CollectionGetPayload<{
  select: {
    slug: true;
    imageUrl: true;
    translations: {
      where: {
        language: string;
      };
      select: {
        name: true;
        description: true;
      };
    };
  };
}>;

export type CollectionDTO = {
  slug: string;
  name: string;
  description: string | null;
};

export type CollectionWithImageDto = CollectionDTO & {
  imageUrl: string;
};
