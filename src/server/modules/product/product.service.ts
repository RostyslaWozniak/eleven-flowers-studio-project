import { validateLang } from "@/lib/utils";
import { getLocale } from "next-intl/server";
import { ProductRepository } from "./product.repository";
import type {
  GetAllProductsSchema,
  GetManyProductsByColectionSlugSchema,
  GetRelatedSchema,
  ProductDTO,
  ProductFromDb,
} from "./product.types";
import { type Locale } from "@/i18n/routing";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export class ProductService {
  static async getAll(
    input: GetAllProductsSchema,
  ): Promise<{ products: ProductDTO[]; productsCount: number }> {
    const locale = await getLocale().then(validateLang);
    const productsCount = await ProductRepository.getProductsCount();
    // if order by price
    if (input.orderBy?.includes("price")) {
      const order = input.orderBy
        .split("-")
        .find((o) => o === "asc" || o === "desc");

      const orderedProducts = await this.getAllProductsOrderedByPrice({
        locale,
        order,
        take: input.take,
        skip: input.skip,
      });
      return {
        products: this.mapManyProductsToDTO(orderedProducts),
        productsCount,
      };
    }
    // if order by popular or new
    const orderBy =
      input.orderBy === "popular"
        ? { orderItem: { _count: Prisma.SortOrder.desc } }
        : { createdAt: Prisma.SortOrder.desc };

    const products = await ProductRepository.findAll(
      {
        take: input.take,
        skip: input.skip,
        orderBy,
      },
      locale,
    );
    return { products: this.mapManyProductsToDTO(products), productsCount };
  }

  static async getById(id: string): Promise<ProductDTO | null> {
    const locale = await getLocale().then(validateLang);

    return this.mapOneProductToDTO(
      await ProductRepository.findById(id, locale),
    );
  }

  static async getByIdOrThrow(id: string): Promise<ProductDTO> {
    const product = await this.getById(id);

    if (!product) throw new TRPCError({ code: "NOT_FOUND" });

    return product;
  }

  static async getBySlug(slug: string): Promise<ProductDTO | null> {
    const locale = await getLocale().then(validateLang);

    return this.mapOneProductToDTO(
      await ProductRepository.findBySlug(slug, locale),
    );
  }

  static async getBySlugOrThrow(slug: string): Promise<ProductDTO> {
    const product = await this.getBySlug(slug);
    if (!product) throw new TRPCError({ code: "NOT_FOUND" });

    return product;
  }

  static async getManyByColectionSlug(
    input: GetManyProductsByColectionSlugSchema,
  ): Promise<{
    products: ProductDTO[];
    productsCount: number;
  }> {
    const locale = await getLocale().then(validateLang);
    const productsCount = await ProductRepository.getProductsCount();
    const products: ProductFromDb[] =
      await ProductRepository.getManyByColectionSlug(input, locale);

    return { products: this.mapManyProductsToDTO(products), productsCount };
  }

  static async getRelated(input: GetRelatedSchema): Promise<ProductDTO[]> {
    const locale = await getLocale().then(validateLang);
    const relatedProducts = await ProductRepository.getRelated(input, locale);
    return this.mapManyProductsToDTO(relatedProducts);
  }

  private static mapOneProductToDTO(
    product: ProductFromDb | null,
  ): ProductDTO | null {
    if (!product) return null;

    const translation = product.translations[0]!;
    return {
      id: product.id,
      slug: product.slug,
      name: translation.name,
      description: translation.description,
      collection: product.collection
        ? {
            slug: product.collection.slug,
            name: product.collection.translations[0]?.name ?? "",
          }
        : undefined,
      images: product.images.map((img) => img.url),
      prices: product.prices.map((price) => ({
        size: price.size,
        price: price.price,
      })),
    };
  }

  private static mapManyProductsToDTO(products: ProductFromDb[]): ProductDTO[] {
    if (products.length === 0) return [];
    return products.map((product) => {
      const translation = product.translations[0]!;
      return {
        id: product.id,
        slug: product.slug,
        name: translation.name,
        description: translation.description,
        collection: product.collection
          ? {
              slug: product.collection.slug,
              name: product.collection.translations[0]?.name ?? "",
            }
          : undefined,
        images: product.images.map((img) => img.url),
        prices: product.prices.map((price) => ({
          size: price.size,
          price: price.price,
        })),
      };
    });
  }

  private static async getAllProductsOrderedByPrice({
    locale,
    order,
    take,
    skip,
  }: Omit<GetAllProductsSchema, "orderBy"> & {
    locale: Locale;
  }): Promise<ProductFromDb[]> {
    const orderedProductIds =
      await ProductRepository.getOrderedProductIdsByPrice({
        order,
        take,
        skip,
      });
    // Extract ordered product IDs
    const productIdsInOrder = orderedProductIds.map((p) => p.productId);
    // QUERY PRODUCTS
    const products = await ProductRepository.findByIds(
      productIdsInOrder,
      locale,
    );
    return productIdsInOrder
      .map((id) => products.find((product) => product.id === id))
      .filter((product) => product !== undefined);
  }
}
