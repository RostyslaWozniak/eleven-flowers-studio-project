import { env } from "@/env";
import { api } from "@/trpc/server";
import { type MetadataRoute } from "next";
import { getLocale } from "next-intl/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const collections = await api.public.collections.getAllCollections({});
  const { products } = await api.public.products.getAllProducts({});

  const locale = await getLocale();
  const baseUrl = `${env.NEXT_PUBLIC_SERVER_URL}/${locale}`;
  const collectionPages: MetadataRoute.Sitemap = collections.map(
    (collection) => ({
      url: `${baseUrl}/collections/${collection.slug}`,
      lastModified: new Date(),
    }),
  );

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(),
  }));
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/collections`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
    },
    ...collectionPages,
    ...productPages,
  ];
}
