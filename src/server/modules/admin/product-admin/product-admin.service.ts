import type { AddProductSchema } from "@/lib/validation/product";
import { ProductAdminRepository } from "./product-admin.repository";
import type {
  ProductAdminDTO,
  ProductAdminFromDb,
  ProductAdminGetAllSchema,
} from "./product-admin.types";
import { CollectionAdminService } from "../collection-admin/collection-admin.service";
import { type $Enums } from "@prisma/client";

export class ProductAdminService {
  public static getAllWithCount = async (input: ProductAdminGetAllSchema) => {
    const productsCount = await this.getCount();

    const products = await this.getAll(input);

    return { products, productsCount };
  };

  public static create = async (input: AddProductSchema) => {
    const collection = await CollectionAdminService.getBySlugOrThrow(
      input.collectionSlug,
    );

    const { translationsData, pricesData, imagesData } =
      this.mapInputData(input);

    const product = await ProductAdminRepository.create(
      {
        slug: input.slug,
        collectionId: collection.id,
        translationsData,
        pricesData,
        imagesData,
      },
      { id: true },
    );

    return product.id;
  };

  public static update = async (id: string, input: AddProductSchema) => {
    const { translationsData, pricesData, imagesData } =
      this.mapInputData(input);
    const collection = await CollectionAdminService.getBySlugOrThrow(
      input.collectionSlug,
    );
    const updatedProduct = await ProductAdminRepository.update(id, {
      translations: {
        deleteMany: {},
        createMany: {
          data: translationsData,
        },
      },

      prices: {
        deleteMany: {},
        createMany: {
          data: pricesData,
        },
      },
      images: {
        deleteMany: {},
        createMany: {
          data: imagesData,
        },
      },
      collection: {
        connect: {
          id: collection.id,
        },
      },
    });
    return updatedProduct.id;
  };

  public static delete = async (id: string) => {
    return await ProductAdminRepository.delete(id);
  };

  public static getAll = async (input: ProductAdminGetAllSchema) => {
    const products = await ProductAdminRepository.findAll(input);

    return this.mapAllToDto(products);
  };

  public static getCount = async () => {
    return await ProductAdminRepository.getProductsCount();
  };

  public static changeStatus = async (
    id: string,
    status: $Enums.ProductStatus,
  ) => {
    return await ProductAdminRepository.update(id, { status });
  };

  private static mapAllToDto = (
    products: ProductAdminFromDb[],
  ): ProductAdminDTO[] => {
    return products.map((product) => ({
      id: product.id,
      slug: product.slug,
      status: product.status,
      name: product.translations.map(({ name, language }) => ({
        lang: language,
        name,
      })),
      description: product.translations.map(({ description, language }) => ({
        lang: language,
        description,
      })),
      collection: product.collection
        ? {
            slug: product.collection.slug,
            name: product.collection.translations[0]?.name ?? "Uncategorized",
          }
        : undefined,
      images: product.images.map((img) => img.url),
      prices: product.prices.map((price) => ({
        size: price.size,
        price: price.price,
      })),
    }));
  };

  private static mapInputData = (input: AddProductSchema) => {
    const translationsData = Object.entries(input.translations).map(
      ([key, value]) => ({
        language: key,
        name: value.name,
        description: value.description,
      }),
    );
    const pricesData = input.prices.map(({ size, price }) => ({
      size: size,
      price: price * 100,
    }));
    const imagesData = input.images.map((image) => ({ url: image }));

    return { translationsData, pricesData, imagesData };
  };
}
