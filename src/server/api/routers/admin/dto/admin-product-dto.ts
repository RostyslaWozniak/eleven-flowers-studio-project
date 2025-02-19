import { type Locale } from "@/i18n/routing";
import type {
  AdminProductDto,
  PrismaGetAdminProducts,
} from "../types/product-types";

export const mapAdminProductToDto = (
  product: PrismaGetAdminProducts,
): AdminProductDto => {
  return {
    id: product.id,
    slug: product.slug,
    name: product.translations.map(({ name, language }) => ({
      lang: language as Locale,
      name,
    })),
    description: product.translations.map(({ description, language }) => ({
      lang: language as Locale,
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
  };
};

export const mapAdminProductsToDto = (
  products: PrismaGetAdminProducts[],
): AdminProductDto[] => {
  return products.map((product) => ({
    id: product.id,
    slug: product.slug,
    name: product.translations.map(({ name, language }) => ({
      lang: language as Locale,
      name,
    })),
    description: product.translations.map(({ description, language }) => ({
      lang: language as Locale,
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
