import { Prisma } from "@prisma/client";
import { z } from "zod";
import { productSort } from "./product.const";

export class ProductSchema {
  public static getAll = z.object({
    take: z.number().optional(),
    skip: z.number().optional(),
    orderBy: z.enum(productSort).optional(),
    order: z.enum([Prisma.SortOrder.asc, Prisma.SortOrder.desc]).optional(),
  });

  public static getProductById = z.object({
    id: z.string().uuid("Product ID must be a valid UUID"),
  });

  public static getProductBySlug = z.object({
    slug: z
      .string()
      .min(1, "Slug must be at least 1 character long")
      .max(100, "Slug must not exceed 100 characters")
      .regex(
        /^[a-z0-9-]+$/,
        "Slug must be lowercase and contain only letters, numbers, and hyphens",
      ),
  });

  public static getManyByColectionSlug = z.object({
    collectionSlug: z.string(),
    take: z.number().optional(),
    skip: z.number().optional(),
  });

  public static getRelated = z.object({
    productId: z.string().uuid(),
    collectionSlug: z.string().nullable(),
    take: z.number().default(4),
  });
}
