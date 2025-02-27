import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import { mapProductsToDTO, mapProductToDTO } from "@/lib/utils/dto/products";
import type {
  ProductByIdFromPrisma,
  ProductDTO,
  ProductFromPrisma,
} from "@/types";
import { $Enums, Prisma } from "@prisma/client";
import { getLocale } from "next-intl/server";
import { getAllProducts, getAllProductsOrderedByPrice } from "../lib/products";
import { validateLang } from "@/lib/utils";
import { PUBLIC_PRODUCT_SELECT_FIELDS } from "./services/product-quries";

const productSort = ["new", "popular", "price-desc", "price-asc"] as const;

export type ProductSort = (typeof productSort)[number];

export const productsRouter = createTRPCRouter({
  getById: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      }),
    )
    .query(async ({ ctx, input }): Promise<ProductDTO | null> => {
      const locale = await getLocale();
      const lang = validateLang(locale);

      const product: ProductByIdFromPrisma | null =
        await ctx.db.product.findFirst({
          where: {
            id: input.id,
            status: $Enums.ProductStatus.AVAILABLE,
          },

          select: PUBLIC_PRODUCT_SELECT_FIELDS({ locale: lang }),
        });

      return product ? mapProductToDTO(product) : null;
    }),

  getBySlug: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      }),
    )
    .query(async ({ ctx, input }): Promise<ProductDTO | null> => {
      const locale = await getLocale();
      const lang = validateLang(locale);

      const product: ProductByIdFromPrisma | null =
        await ctx.db.product.findFirst({
          where: {
            slug: input.slug,
            status: $Enums.ProductStatus.AVAILABLE,
          },
          select: PUBLIC_PRODUCT_SELECT_FIELDS({ locale: lang }),
        });

      return product ? mapProductToDTO(product) : null;
    }),

  getAll: publicProcedure
    .input(
      z.object({
        take: z.number().optional(),
        skip: z.number().optional(),
        orderBy: z.enum(productSort).optional(),
        order: z.enum([Prisma.SortOrder.asc, Prisma.SortOrder.desc]).optional(),
      }),
    )
    .query(
      async ({
        ctx,
        input,
      }): Promise<{ products: ProductDTO[]; productsCount: number }> => {
        const locale = await getLocale();
        const lang = validateLang(locale);

        const productsCount = await ctx.db.product.count();

        // if ordering by price desc or asc
        if (input.orderBy === "price-desc") {
          const orderedProducts = await getAllProductsOrderedByPrice({
            locale: lang,
            order: "desc",
            take: input.take,
            skip: input.skip,
          });

          return {
            products: orderedProducts,
            productsCount,
          };
        } else if (input.orderBy === "price-asc") {
          const orderedProducts = await getAllProductsOrderedByPrice({
            locale: lang,
            order: "asc",
            take: input.take,
            skip: input.skip,
          });

          return {
            products: orderedProducts,
            productsCount,
          };
        }

        // if  ordering by new, popular
        const orderBy =
          input.orderBy === "popular"
            ? { orderItem: { _count: Prisma.SortOrder.desc } }
            : { createdAt: Prisma.SortOrder.desc };
        const products = await getAllProducts({
          locale: lang,
          take: input.take,
          skip: input.skip,
          orderBy: orderBy,
        });

        return { productsCount, products };
      },
    ),

  getByCollectionSlug: publicProcedure
    .input(
      z.object({
        collectionSlug: z.string(),
        take: z.number().optional(),
        skip: z.number().optional(),
      }),
    )
    .query(
      async ({
        ctx,
        input,
      }): Promise<{ products: ProductDTO[]; productsCount: number }> => {
        const locale = await getLocale();
        const lang = validateLang(locale);

        const productsCount = await ctx.db.product.count({
          where: {
            collection: {
              slug: input.collectionSlug,
            },
            status: $Enums.ProductStatus.AVAILABLE,
          },
        });

        const products: ProductFromPrisma[] = await ctx.db.product.findMany({
          where: {
            collection: {
              slug: input.collectionSlug,
            },
            status: $Enums.ProductStatus.AVAILABLE,
          },
          select: PUBLIC_PRODUCT_SELECT_FIELDS({ locale: lang }),
          take: input.take,
          skip: input.skip,
        });

        return { products: mapProductsToDTO(products), productsCount };
      },
    ),

  getRelated: publicProcedure
    .input(
      z.object({
        productId: z.string().uuid(),
        collectionSlug: z.string().nullable(),
        take: z.number().default(4),
      }),
    )
    .query(async ({ ctx, input }) => {
      const locale = await getLocale();
      const lang = validateLang(locale);

      const products = await ctx.db.product.findMany({
        where: {
          id: {
            not: input.productId,
          },
          status: $Enums.ProductStatus.AVAILABLE,
          ...(input.collectionSlug === null
            ? {}
            : { collection: { slug: input.collectionSlug } }),
        },
        select: PUBLIC_PRODUCT_SELECT_FIELDS({ locale: lang }),
        orderBy: {
          orderItem: {
            _count: Prisma.SortOrder.desc,
          },
        },
        take: input.take,
      });
      return mapProductsToDTO(products);
    }),
});
