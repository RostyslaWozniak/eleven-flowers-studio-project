import { env } from "@/env";
import { api } from "@/trpc/server";
import { type MetadataRoute } from "next";
import { getLocale } from "next-intl/server";

export const dynamic = "force-static";

export const revalidate = 86400; // 1 day

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
    url: `${baseUrl}/collections/${product.collection?.slug}/${product.slug}`,
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
