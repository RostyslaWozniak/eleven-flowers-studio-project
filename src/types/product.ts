import type { Prisma } from "@prisma/client";

export type ProductFromPrisma = Prisma.ProductGetPayload<{
  select: {
    id: true;
    slug: true;
    collection: {
      select: {
        slug: true;
        translations: {
          where: {
            language: string;
          };
          select: {
            name: true;
          };
        };
      };
    };
    images: {
      select: {
        url: true;
      };
    };
    prices: {
      select: {
        price: true;
        size: true;
      };
      orderBy: {
        price: "asc";
      };
    };
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

export type ProductByIdFromPrisma = Prisma.ProductGetPayload<{
  where: {
    id: string;
  };
  select: {
    id: true;
    slug: true;
    collection: {
      select: {
        slug: true;
        translations: {
          where: {
            language: string;
          };
          select: {
            name: true;
          };
        };
      };
    };
    images: {
      select: {
        url: true;
      };
    };
    prices: {
      select: {
        price: true;
        size: true;
      };
      orderBy: {
        price: "asc";
      };
    };
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

export type ProductDTO = {
  id: string;
  slug: string;
  name: string;
  description: string;
  collection?: {
    slug: string;
    name: string;
  };
  images: string[];
  prices: { size: string; price: number }[];
};
