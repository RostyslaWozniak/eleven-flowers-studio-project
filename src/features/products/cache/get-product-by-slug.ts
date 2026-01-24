import { cacheData } from "@/lib/next-cache";
import { api } from "@/trpc/server";

export function getProductBySlug(slug: string) {
  return cacheData(
    () => api.public.products.getBySlug({ slug }),
    ["products", "slug", slug],
    [`product:slug:${slug}`],
  )();
}
