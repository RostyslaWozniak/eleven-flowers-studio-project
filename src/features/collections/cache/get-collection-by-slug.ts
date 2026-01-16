import { cacheData } from "@/lib/next-cache";
import { db } from "@/server/db";

export function getCollectionBySlug(slug: string) {
  return cacheData(
    async () => db.collection.findUnique({ where: { slug } }),
    ["collections", "slug", slug],
    ["collections", `collection:slug:${slug}`],
  )();
}
