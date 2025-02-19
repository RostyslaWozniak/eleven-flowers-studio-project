import { type Prisma } from "@prisma/client";
import { type ADMIN_PRODUCT_SELECT_FIELDS } from "../services/products-queries";
import { type routing } from "@/i18n/routing";

export type PrismaGetAdminProducts = Prisma.ProductGetPayload<{
  select: typeof ADMIN_PRODUCT_SELECT_FIELDS;
}>;

export type AdminProductDto = {
  id: string;
  slug: string;
  name: { name: string; lang: (typeof routing.locales)[number] }[];
  description: {
    description: string;
    lang: (typeof routing.locales)[number];
  }[];
  collection?: {
    slug: string;
    name: string;
  };
  images: string[];
  prices: { size: string; price: number }[];
};
