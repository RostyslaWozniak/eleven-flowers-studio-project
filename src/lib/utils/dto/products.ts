import type {
  ProductByIdFromPrisma,
  ProductDTO,
  ProductFromPrisma,
} from "@/types";

export const mapProductToDTO = (product: ProductByIdFromPrisma): ProductDTO => {
  return {
    id: product.id,
    slug: product.slug,
    name: product.translations[0]?.name ?? "Unnamed Product",
    description: product.translations[0]?.description ?? "",
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

export const mapProductsToDTO = (
  products: ProductFromPrisma[],
): ProductDTO[] => {
  return products.map((product) => ({
    id: product.id,
    slug: product.slug,
    name: product.translations[0]?.name ?? "Unnamed Product",
    description: product.translations[0]?.description ?? "",
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
