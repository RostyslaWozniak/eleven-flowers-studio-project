import { unstable_cache } from "next/cache";

export function cacheData<T>(
  fn: () => Promise<T>,
  key: string[],
  tags?: string[],
) {
  return unstable_cache(fn, key, { tags });
}
