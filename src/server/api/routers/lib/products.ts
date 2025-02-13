import { db } from "@/server/db";
import { Prisma } from "@prisma/client";

export async function getAllProducts({
  locale,
  take,
  skip,
  orderBy,
}: {
  locale: string;
  take: number | undefined;
  skip: number | undefined;
  orderBy: Prisma.ProductOrderByWithRelationInput;
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

  return products;
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
  const orderedProducts = productIdsInOrder.map((id) =>
    products.find((product) => product.id === id),
  );
  return orderedProducts;
}
