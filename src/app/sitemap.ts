import { env } from "@/env";
import { routing } from "@/i18n/routing";
import { type MetadataRoute } from "next";

const baseUrl = env.NEXT_PUBLIC_SERVER_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return routing.locales.map((locale) => ({
    url: `${baseUrl}/${locale}/sitemap.xml`,
    lastModified: new Date().toISOString(),
  }));
}
