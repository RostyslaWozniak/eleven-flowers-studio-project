import { type Locale } from "@/i18n/routing";
import { cacheData } from "@/lib/next-cache";
import { type GetAllProductsSchema } from "@/server/modules/product/product.types";
import { api } from "@/trpc/server";

export function getProducts({
  locale,
  collectionSlug,
  productId,
  take,
  order,
  orderBy,
  skip,
}: {
  locale: Locale;
  collectionSlug?: string;
  productId?: string;
} & GetAllProductsSchema) {
  const takeKeyWord = take ? take.toString() : "all";
  const orderKeyWord = order ?? "desc";
  const orderByKeyWord = orderBy ?? "createdAt";
  const skipKeyWord = skip ? skip.toString() : "0";

  if (productId && collectionSlug) {
    return cacheData(
      () =>
        api.public.products.getRelated({
          productId,
          collectionSlug,
          take,
        }),
      [
        "products",
        locale,
        collectionSlug,
        productId,
        takeKeyWord,
        orderKeyWord,
        orderByKeyWord,
        skipKeyWord,
      ],
      ["products"],
    )();
  }

  if (collectionSlug) {
    return cacheData(
      () =>
        api.public.products.getManyByColectionSlug({
          collectionSlug,
          take,
          skip,
        }),
      [
        "products",
        locale,
        collectionSlug,
        takeKeyWord,
        orderKeyWord,
        orderByKeyWord,
        skipKeyWord,
      ],
      ["products"],
    )();
  }

  return cacheData(
    () => api.public.products.getAll({ take, orderBy, order, skip }),
    [
      "products",
      locale,
      takeKeyWord,
      orderKeyWord,
      orderByKeyWord,
      skipKeyWord,
    ],
    ["products"],
  )();
}
