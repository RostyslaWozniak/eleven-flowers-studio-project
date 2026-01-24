"use server";

import { type AddProductSchema } from "@/lib/validation/product";
import { api } from "@/trpc/server";
import { revalidateTag } from "next/cache";

export async function createProductAction(
  input: AddProductSchema,
): Promise<{ error: string | null }> {
  try {
    await api.admin.products.create(input);
    revalidateTag("products");
    return { error: null };
  } catch (error) {
    console.error(error);
    return { error: "Something went wront. Try again!" };
  }
}
