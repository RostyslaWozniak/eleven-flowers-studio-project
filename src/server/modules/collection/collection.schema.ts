import { Prisma } from "@prisma/client";
import { z } from "zod";

export class CollectionSchema {
  private static collectionScalarFieldEnum = z.enum([
    Prisma.CollectionScalarFieldEnum.createdAt,
    Prisma.CollectionScalarFieldEnum.updatedAt,
    Prisma.CollectionScalarFieldEnum.slug,
  ]);
  private static sortOrderEnum = z.enum([
    Prisma.SortOrder.asc,
    Prisma.SortOrder.desc,
  ]);

  public static getAll = z.object({
    take: z.number().optional(),
    skip: z.number().optional(),
    orderBy: this.collectionScalarFieldEnum.optional(),
    order: this.sortOrderEnum.optional(),
  });

  public static getBySlug = z.object({
    slug: z
      .string()
      .min(1, "Slug must be at least 1 character long")
      .max(20, "Slug must not exceed 20 characters")
      .regex(
        /^[a-z0-9-]+$/,
        "Slug must be lowercase and contain only letters, numbers, and hyphens",
      ),
  });
}
