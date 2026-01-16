"use server";

import { revalidateTag } from "next/cache";
import { type CreateCollectionSchema } from "../types/collection.types";
import { routing } from "@/i18n/routing";
import { api } from "@/trpc/server";

export async function createCollectionAction(input: CreateCollectionSchema) {
  const newCollection = await api.admin.collections.create(input);

  routing.locales.forEach((lang) => {
    revalidateTag(`collections-${lang}`);
  });

  return newCollection;
}
