import { db } from "@/server/db";
import type {
  CreateProductRepository,
  ProductAdminFromDb,
  ProductAdminGetAllSchema,
} from "./product-admin.types";
import { ProductAdminQueries } from "./product-admin.queries";
import type { Prisma, Product } from "@prisma/client";

export class ProductAdminRepository {
  public static create = async (
    {
      slug,
      collectionId,
      translationsData,
      pricesData,
      imagesData,
    }: CreateProductRepository,
    selectFields?: Partial<Record<keyof Product, boolean>>,
  ) => {
    return await db.product.create({
      data: {
        slug,
        collectionId,
        translations: {
          createMany: {
            data: translationsData,
          },
        },
        prices: {
          createMany: {
            data: pricesData,
          },
        },
        images: {
          createMany: {
            data: imagesData,
          },
        },
      },
      select:
        selectFields ?? ProductAdminQueries.selectFields({ locale: "en" }),
    });
  };

  public static async getProductsCount(): Promise<number> {
    return await db.product.count();
  }

  public static async findAll({
    take,
    skip,
  }: ProductAdminGetAllSchema): Promise<ProductAdminFromDb[]> {
    return db.product.findMany({
      select: ProductAdminQueries.selectFields({ locale: "en" }),
      orderBy: { createdAt: "desc" },
      take,
      skip,
    });
  }

  public static async findBySlug(slug: string): Promise<Product | null> {
    return await db.product.findUnique({ where: { slug } });
  }

  public static async update(id: string, data: Prisma.ProductUpdateInput) {
    return await db.product.update({
      where: { id },
      data,
    });
  }

  public static async delete(id: string) {
    return await db.product.delete({ where: { id } });
  }
  public static async changeStatus(
    id: string,
    data: Prisma.ProductUpdateInput,
  ) {
    return await db.product.update({
      where: { id },
      data,
      include: {
        collection: {
          select: {
            slug: true,
          },
        },
      },
    });
  }
}
