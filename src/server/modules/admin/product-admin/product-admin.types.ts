import type { $Enums, Prisma } from "@prisma/client";
import type { ProductAdminQueries } from "./product-admin.queries";
import type { z } from "zod";
import type { ProductAdminSchema } from "./product-admin.schema";

export type ProductAdminFromDb = Prisma.ProductGetPayload<{
  select: ReturnType<typeof ProductAdminQueries.selectFields>;
}>;

export type ProductAdminDTO = {
  id: string;
  slug: string;
  name: { name: string; lang: string }[];
  description: {
    description: string;
    lang: string;
  }[];
  collection?: {
    slug: string;
    name: string;
  };
  images: string[];
  prices: { size: string; price: number }[];
  status: $Enums.ProductStatus;
};

export type CreateProductRepository = {
  slug: string;
  collectionId: string;
  translationsData: {
    language: string;
    name: string;
    description: string;
  }[];
  pricesData: {
    size: string;
    price: number;
  }[];
  imagesData: {
    url: string;
  }[];
};

export type ProductAdminGetAllSchema = z.infer<
  typeof ProductAdminSchema.getAll
>;
