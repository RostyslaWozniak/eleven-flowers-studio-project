import { type Prisma } from "@prisma/client";
import { type ProductQueries } from "./product.queries";
import type { ProductSchema } from "./product.schema";
import type { z } from "zod";
import { type productSort } from "./product.const";

export type ProductFromDb = Prisma.ProductGetPayload<{
  select: ReturnType<typeof ProductQueries.selectFields>;
}>;

export type ProductDTO = {
  id: string;
  slug: string;
  name: string;
  description: string;
  collection?: {
    slug: string;
    name: string;
  };
  images: string[];
  prices: { size: string; price: number }[];
};

export type GetAllProductsSchema = z.infer<typeof ProductSchema.getAll>;

export type GetManyProductsByColectionSlugSchema = z.infer<
  typeof ProductSchema.getManyByColectionSlug
>;

export type GetRelatedSchema = z.infer<typeof ProductSchema.getRelated>;

export type ProductSort = (typeof productSort)[number];
