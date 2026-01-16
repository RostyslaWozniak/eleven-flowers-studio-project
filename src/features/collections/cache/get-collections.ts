import { type Locale } from "@/i18n/routing";
import { cacheData } from "@/lib/next-cache";
import { api } from "@/trpc/server";

export function getCollections({
  locale,
  take,
}: {
  locale: Locale;
  take?: number;
}) {
  const takeKeyWord = take ? take.toString() : "all";
  return cacheData(
    () => api.public.collections.getAll({ take }),
    ["collections", locale, takeKeyWord],
    ["collections", `collections-${locale}`],
  )();
}
