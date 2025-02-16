import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import { mapProductsToDTO, mapProductToDTO } from "@/lib/utils/dto/products";
import type {
  ProductByIdFromPrisma,
  ProductDTO,
  ProductFromPrisma,
} from "@/types";
import { Prisma } from "@prisma/client";
import { getLocale } from "next-intl/server";
import { getAllProducts, getAllProductsOrderedByPrice } from "../lib/products";

const getAllProductsSchema = z.object({
  take: z.number().optional(),
  skip: z.number().optional(),
  orderBy: z.string().optional(),
  order: z.enum([Prisma.SortOrder.asc, Prisma.SortOrder.desc]).optional(),
});

const getProductByIdSchema = z.object({
  id: z.string().uuid(),
});
const getProductBySlugSchema = z.object({
  slug: z.string(),
});

export const dynamic = "force-static";

export const productsRouter = createTRPCRouter({
  // GET PRODUCT BY SLUG

  getProductById: publicProcedure
    .input(getProductByIdSchema)
    .query(async ({ ctx, input }): Promise<ProductDTO | null> => {
      const locale = await getLocale();
      const product: ProductByIdFromPrisma | null =
        await ctx.db.product.findFirst({
          where: {
            id: input.id,
          },

          select: {
            id: true,
            slug: true,
            collection: {
              select: {
                slug: true,
                translations: {
                  where: {
                    language: locale,
                  },
                  select: {
                    name: true,
                  },
                },
              },
            },
            images: {
              select: {
                url: true,
              },
            },

            prices: {
              select: {
                price: true,
                size: true,
              },
              orderBy: {
                price: "asc",
              },
            },
            translations: {
              where: {
                language: locale,
              },

              select: {
                name: true,
                description: true,
              },
            },
          },
        });

      return product ? mapProductToDTO(product) : null;
    }),
  // GET PRODUCT BY SLUG
  getProductBySlug: publicProcedure
    .input(getProductBySlugSchema)
    .query(async ({ ctx, input }): Promise<ProductDTO | null> => {
      const locale = await getLocale();
      const product: ProductByIdFromPrisma | null =
        await ctx.db.product.findFirst({
          where: {
            slug: input.slug,
          },
          select: {
            id: true,
            slug: true,
            collection: {
              select: {
                slug: true,
                translations: {
                  where: {
                    language: locale,
                  },
                  select: {
                    name: true,
                  },
                },
              },
            },
            images: {
              select: {
                url: true,
              },
            },
            prices: {
              select: {
                price: true,
                size: true,
              },
              orderBy: {
                price: "asc",
              },
            },
            translations: {
              where: {
                language: locale,
              },
              select: {
                name: true,
                description: true,
              },
            },
          },
        });

      return product ? mapProductToDTO(product) : null;
    }),

  // GET ALL PRODUCTS
  getAllProducts: publicProcedure
    .input(getAllProductsSchema)
    .query(
      async ({
        ctx,
        input,
      }): Promise<{ products: ProductDTO[]; productsCount: number }> => {
        const locale = await getLocale();

        const productsCount = await ctx.db.product.count();

        const orderBy =
          input.orderBy === "popularity"
            ? { orderItem: { _count: Prisma.SortOrder.desc } }
            : input.orderBy === "createdAt"
              ? { updatedAt: Prisma.SortOrder.desc }
              : { createdAt: Prisma.SortOrder.desc };

        if (input.orderBy === "price") {
          const orderedProducts = await getAllProductsOrderedByPrice({
            locale,
            order: input.order,
            take: input.take,
            skip: input.skip,
          });

          if (orderedProducts.length === 0)
            return { products: [], productsCount };

          return {
            products: orderedProducts.filter(
              (product) => product !== undefined,
            ),
            productsCount,
          };
        }

        const products = await getAllProducts({
          locale,
          take: input.take,
          skip: input.skip,
          orderBy: orderBy,
        });

        return { productsCount, products };
      },
    ),
  // GET PRODUCTS BY COLLECTION SLUG
  getProductsByCollectionSlug: publicProcedure
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

        const productsCount = await ctx.db.product.count({
          where: {
            collection: {
              slug: input.collectionSlug,
            },
          },
        });

        const products: ProductFromPrisma[] = await ctx.db.product.findMany({
          where: {
            collection: {
              slug: input.collectionSlug,
            },
          },
          select: {
            id: true,
            slug: true,
            collection: {
              select: {
                slug: true,
                translations: {
                  where: {
                    language: locale,
                  },
                  select: {
                    name: true,
                  },
                },
              },
            },
            images: {
              select: {
                url: true,
              },
            },
            prices: {
              select: {
                price: true,
                size: true,
              },
              orderBy: {
                price: "asc",
              },
            },
            translations: {
              where: {
                language: locale,
              },
              select: {
                name: true,
                description: true,
              },
            },
          },
          take: input.take,
          skip: input.skip,
        });

        return { products: mapProductsToDTO(products), productsCount };
      },
    ),

  getRelatedProducts: publicProcedure
    .input(
      z.object({
        productId: z.string().uuid(),
        collectionSlug: z.string().nullable(),
        take: z.number().default(4),
      }),
    )
    .query(async ({ ctx, input }) => {
      const locale = await getLocale();
      const products = await ctx.db.product.findMany({
        where: {
          id: {
            not: input.productId,
          },
          ...(input.collectionSlug === null
            ? {}
            : { collection: { slug: input.collectionSlug } }),
        },
        select: {
          id: true,
          slug: true,
          collection: {
            select: {
              slug: true,
              translations: {
                where: {
                  language: locale,
                },
                select: {
                  name: true,
                },
              },
            },
          },
          images: {
            select: {
              url: true,
            },
          },
          prices: {
            select: {
              price: true,
              size: true,
            },
            take: 1,
            orderBy: {
              price: "asc",
            },
          },
          translations: {
            where: {
              language: locale,
            },
            select: {
              name: true,
              description: true,
            },
          },
        },
        orderBy: {
          orderItem: {
            _count: "desc",
          },
        },
        take: input.take,
      });
      return mapProductsToDTO(products);
    }),
});
