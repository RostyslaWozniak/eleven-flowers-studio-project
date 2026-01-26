"use server";

import { api } from "@/trpc/server";
import { type ChangeProductStatusSchema } from "../lib/schema/change-product-status.schema";
import { revalidatePath } from "next/cache";
import { routing } from "@/i18n/routing";

export async function changeProductStatusAction(
  input: ChangeProductStatusSchema,
): Promise<{ error: string | null }> {
  try {
    const updatedProduct = await api.admin.products.changeStatus(input);
    routing.locales.forEach((lang) => {
      revalidatePath(
        `/${lang}/collections/${updatedProduct.collection?.slug}/${updatedProduct.slug}`,
      );
    });
    return { error: null };
  } catch (error) {
    console.log(error);
    return { error: "Failad to update product's status. Try again" };
  }
}
