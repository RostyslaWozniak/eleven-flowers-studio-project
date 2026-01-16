"use server";

import { routing } from "@/i18n/routing";
import type { UpdateCollectionSchema } from "../types/collection.types";
import { revalidatePath, revalidateTag } from "next/cache";
import { api } from "@/trpc/server";

export async function updateCollectionAction(input: UpdateCollectionSchema) {
  const updatedCollection = await api.admin.collections.update(input);

  routing.locales.forEach((lang) => {
    revalidateTag(`collections-${lang}`);
    revalidatePath(`/${lang}/collections/${updatedCollection.slug}`);
  });
}
