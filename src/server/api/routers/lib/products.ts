import { type Locale } from "@/i18n/routing";
import { mapProductsToDTO, mapProductToDTO } from "@/lib/utils/dto";
import { db } from "@/server/db";
import type { ProductByIdFromPrisma, ProductDTO } from "@/types";
import { Prisma } from "@prisma/client";

export async function getAllProducts({
  locale,
  take = 9,
  skip = 0,
  orderBy = { createdAt: "desc" },
}: {
  locale: string;
  take?: number | undefined;
  skip?: number | undefined;
  orderBy?: Prisma.ProductOrderByWithRelationInput;
}) {
  const products = await db.product.findMany({
    select: {
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
    },
    take: take,
    skip: skip,
    orderBy: orderBy,
  });
  return mapProductsToDTO(products);
}

export async function getAllProductsOrderedByPrice({
  locale,
  order,
  take,
  skip,
}: {
  locale: string;
  order: Prisma.SortOrder | undefined;
  take: number | undefined;
  skip: number | undefined;
}) {
  const orderedProductIds = await db.productPrice.groupBy({
    by: ["productId"],
    _min: {
      price: true,
    },
    orderBy: {
      _min: {
        price: order,
      },
    },

    take: take,
    skip: skip,
  });
  // Extract ordered product IDs
  const productIdsInOrder = orderedProductIds.map((p) => p.productId);
  // QUERY PRODUCTS
  const products = await db.product.findMany({
    where: {
      id: { in: productIdsInOrder },
    },
    select: {
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
          price: "asc",
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
  });
  const orderedProducts = productIdsInOrder
    .map((id) => products.find((product) => product.id === id))
    .filter((product) => product !== undefined);

  return mapProductsToDTO(orderedProducts);
}

export async function getRelatedProducts({
  productId,
  collectionSlug,
  locale,
  take,
  skip,
}: {
  productId: string;
  locale: Locale;
  collectionSlug?: string;
  take?: number;
  skip?: number;
}) {
  const products = await db.product.findMany({
    where: {
      id: {
        not: productId,
      },
      ...(collectionSlug === null
        ? {}
        : { collection: { slug: collectionSlug } }),
    },
    select: {
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
        take: 1,
        orderBy: {
          price: "asc",
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
    orderBy: {
      orderItem: {
        _count: "desc",
      },
    },
    take: take,
    skip: skip,
  });
  return mapProductsToDTO(products);
}

export async function getProductBySlug(
  slug: string,
  locale: string,
): Promise<ProductDTO | null> {
  const product: ProductByIdFromPrisma | null = await db.product.findFirst({
    where: {
      slug: slug,
    },
    select: {
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
          price: "asc",
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
  });

  return product ? mapProductToDTO(product) : null;
}
