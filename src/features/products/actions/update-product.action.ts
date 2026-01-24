"use server";

import { routing } from "@/i18n/routing";
import { type AddProductSchema } from "@/lib/validation/product";
import { api } from "@/trpc/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function updateProductAction(
  input: AddProductSchema & { id: string },
): Promise<{ error: string | null }> {
  try {
    await api.admin.products.update(input);
    revalidateTag("products");
    routing.locales.forEach((lang) => {
      revalidateTag(`collections-${lang}`);
      revalidatePath(
        `/${lang}/collections/${input.collectionSlug}/${input.slug}`,
      );
    });
    return { error: null };
  } catch (error) {
    console.error(error);
    return { error: "Something went wront. Try again!" };
  }
}
