import { type Locale } from "@/i18n/routing";
import { mapProductsToDTO, mapProductToDTO } from "@/lib/utils/dto";
import { db } from "@/server/db";
import type { ProductByIdFromPrisma, ProductDTO } from "@/types";
import { $Enums, Prisma } from "@prisma/client";
import { PUBLIC_PRODUCT_SELECT_FIELDS } from "../public/services/product-quries";

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
    where: {
      status: $Enums.ProductStatus.AVAILABLE,
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
  locale: Locale;
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
      status: $Enums.ProductStatus.AVAILABLE,
    },
    select: PUBLIC_PRODUCT_SELECT_FIELDS({ locale }),
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
      status: $Enums.ProductStatus.AVAILABLE,
      ...(collectionSlug ? { collection: { slug: collectionSlug } } : {}),
    },
    select: PUBLIC_PRODUCT_SELECT_FIELDS({ locale }),
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
  locale: Locale,
): Promise<ProductDTO | null> {
  const product: ProductByIdFromPrisma | null = await db.product.findFirst({
    where: {
      slug: slug,
      status: $Enums.ProductStatus.AVAILABLE,
    },
    select: PUBLIC_PRODUCT_SELECT_FIELDS({ locale }),
  });

  return product ? mapProductToDTO(product) : null;
}
