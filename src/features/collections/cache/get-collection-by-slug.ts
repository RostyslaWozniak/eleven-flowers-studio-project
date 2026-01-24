import { type Locale } from "@/i18n/routing";
import { cacheData } from "@/lib/next-cache";
import { api } from "@/trpc/server";

export function getCollectionBySlug(locale: Locale, slug: string) {
  return cacheData(
    () => api.public.collections.getBySlug({ slug }),
    ["collections", "slug", locale, slug],
    ["collections", `collection-${locale}:slug:${slug}`],
  )();
}
