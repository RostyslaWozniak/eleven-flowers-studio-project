import { type Locale } from "@/i18n/routing";
import { db } from "@/server/db";
import { ProductQueries } from "./product.queries";
import { type Prisma } from "@prisma/client";
import type {
  GetRelatedSchema,
  GetManyProductsByColectionSlugSchema,
  ProductFromDb,
  GetAllProductsSchema,
} from "./product.types";

export class ProductRepository {
  static async getProductsCount(): Promise<number> {
    return db.product.count({
      where: {
        status: {
          not: "DISCONTINUED",
        },
      },
    });
  }

  static async getOrderedProductIdsByPrice({
    order,
    take,
    skip,
  }: Omit<GetAllProductsSchema, "orderBy">) {
    return await db.productPrice.groupBy({
      by: ["productId"],
      _min: {
        price: true,
      },
      orderBy: {
        _min: {
          price: order,
        },
      },
      where: {
        product: {
          status: {
            not: "DISCONTINUED",
          },
        },
      },
      take,
      skip,
    });
  }

  static async getManyByColectionSlug(
    { collectionSlug, take, skip }: GetManyProductsByColectionSlugSchema,
    locale: Locale,
  ): Promise<ProductFromDb[]> {
    return await db.product.findMany({
      where: {
        collection: {
          slug: collectionSlug,
        },
        status: {
          not: "DISCONTINUED",
        },
      },
      select: ProductQueries.selectFields({ locale }),
      take,
      skip,
    });
  }

  static async getCountByCollectionSlug(collectionSlug: string) {
    return await db.product.count({
      where: {
        collection: {
          slug: collectionSlug,
        },
        status: {
          not: "DISCONTINUED",
        },
      },
    });
  }

  static async getRelated(
    { productId, collectionSlug, take }: GetRelatedSchema,
    locale: Locale,
  ): Promise<ProductFromDb[]> {
    return await db.product.findMany({
      where: {
        id: { not: productId },
        status: {
          not: "DISCONTINUED",
        },
        ...(collectionSlug === null
          ? {}
          : { collection: { slug: collectionSlug } }),
      },
      select: ProductQueries.selectFields({ locale }),
      take,
    });
  }

  static async findAll(
    {
      take = 9,
      skip = 0,
      orderBy = { createdAt: "desc" },
    }: {
      take?: number | undefined;
      skip?: number | undefined;
      orderBy?: Prisma.ProductOrderByWithRelationInput;
    },
    locale: Locale,
  ): Promise<ProductFromDb[]> {
    return db.product.findMany({
      where: {
        status: {
          not: "DISCONTINUED",
        },
      },
      select: ProductQueries.selectFields({ locale }),
      orderBy,
      take,
      skip,
    });
  }

  static async findById(
    id: string,
    locale: Locale,
  ): Promise<ProductFromDb | null> {
    return await db.product.findUnique({
      where: {
        id,
        status: {
          not: "DISCONTINUED",
        },
      },
      select: ProductQueries.selectFields({ locale }),
    });
  }

  static async findByIds(
    productIdsInOrder: string[],
    locale: Locale,
  ): Promise<ProductFromDb[]> {
    return await db.product.findMany({
      where: {
        id: { in: productIdsInOrder },
        status: {
          not: "DISCONTINUED",
        },
      },
      select: ProductQueries.selectFields({ locale }),
    });
  }

  static async findBySlug(
    slug: string,
    locale: Locale,
  ): Promise<ProductFromDb | null> {
    return db.product.findUnique({
      where: {
        slug,
        status: {
          not: "DISCONTINUED",
        },
      },
      select: ProductQueries.selectFields({ locale }),
    });
  }
}
