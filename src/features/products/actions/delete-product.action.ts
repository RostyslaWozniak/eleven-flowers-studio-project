"use server";

import { api } from "@/trpc/server";
import { revalidateTag } from "next/cache";

export async function deleteProductAction(
  id: string,
): Promise<{ error: string | null }> {
  try {
    await api.admin.products.delete({ id });
    revalidateTag("products");
    return { error: null };
  } catch (err) {
    console.error(err);
    return { error: "Failed to delete product" };
  }
}
