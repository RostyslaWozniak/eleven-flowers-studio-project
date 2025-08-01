import { env } from "@/env";
import { api } from "@/trpc/server";
import { type MetadataRoute } from "next";
import { getLocale } from "next-intl/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const collections = await api.public.collections.getAll({});
  const { products } = await api.public.products.getAll({ take: 100 });

  const locale = await getLocale();
  const baseUrl = `${env.NEXT_PUBLIC_SERVER_URL}/${locale}`;
  const collectionPages: MetadataRoute.Sitemap = collections.map(
    (collection) => ({
      url: `${baseUrl}/collections/${collection.slug}`,
      priority: 0.6,
    }),
  );

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/collections/${product.collection?.slug}/${product.slug}`,
    priority: 0.8,
  }));
  return [
    {
      url: baseUrl,
      priority: 1,
    },
    {
      url: `${baseUrl}/contact`,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/collections`,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/products`,
      priority: 0.9,
    },
    ...collectionPages,
    ...productPages,
  ];
}
