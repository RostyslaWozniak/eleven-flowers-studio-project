"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { routing } from "@/i18n/routing";
import { isAdmin } from "@/auth/is-admin";
import { CollectionService } from "../services/collection.service";

export async function deleteCollectionAction(id: string) {
  if (!(await isAdmin())) return "ERROR";

  const deleted = await CollectionService.delete({ id });
  routing.locales.forEach((lang) => {
    revalidateTag(`collections-${lang}`);
    revalidatePath(`/${lang}/collections/${deleted.slug}`);
  });

  return deleted;
}
