import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import { mapProductsToDTO, mapProductToDTO } from "@/lib/utils/dto/products";
import type {
  ProductByIdFromPrisma,
  ProductDTO,
  ProductFromPrisma,
} from "@/types";
import { Prisma } from "@prisma/client";

const localeSchema = z.object({
  locale: z.string(),
});

const getAllProductsSchema = localeSchema.extend({
  take: z.number().optional(),
  skip: z.number().optional(),
  orderBy: z.string().optional(),
  order: z.enum(["asc", "desc"]).optional(),
});

const getProductByIdSchema = localeSchema.extend({
  id: z.string().uuid(),
});
const getProductBySlugSchema = localeSchema.extend({
  slug: z.string(),
});

const getProductsByCollectionSlugSchema = localeSchema.extend({
  collectionSlug: z.string(),
});

export const productsRouter = createTRPCRouter({
  // GET PRODUCT BY SLUG

  getProductById: publicProcedure
    .input(getProductByIdSchema)
    .query(async ({ ctx, input }): Promise<ProductDTO | null> => {
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
                    language: input.locale,
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
                language: input.locale,
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
                    language: input.locale,
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
                language: input.locale,
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
        let products: ProductFromPrisma[];

        const productsCount = await ctx.db.product.count();

        const orderBy =
          input.orderBy === "popularity"
            ? { orderItem: { _count: Prisma.SortOrder.desc } }
            : input.orderBy === "createdAt"
              ? { updatedAt: Prisma.SortOrder.desc }
              : { createdAt: Prisma.SortOrder.desc };

        if (input.orderBy === "price") {
          const orderedProductIds = await ctx.db.productPrice.groupBy({
            by: ["productId"],
            _min: {
              price: true,
            },
            orderBy: {
              _min: {
                price: input.order,
              },
            },

            take: input.take,
            skip: input.skip,
          });

          // Extract ordered product IDs
          const productIdsInOrder = orderedProductIds.map((p) => p.productId);
          // QUERY PRODUCTS
          products = await ctx.db.product.findMany({
            where: {
              id: { in: productIdsInOrder },
            },
            select: {
              id: true,
              slug: true,
              collection: {
                select: {
                  slug: true,
                  translations: {
                    where: {
                      language: input.locale,
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
                  language: input.locale,
                },
                select: {
                  name: true,
                  description: true,
                },
              },
            },
          });
          const orderedProducts = productIdsInOrder.map((id) =>
            products.find((product) => product.id === id),
          );
          return {
            products: mapProductsToDTO(
              orderedProducts.filter((product) => product !== undefined),
            ),
            productsCount,
          };
        }
        products = await ctx.db.product.findMany({
          select: {
            id: true,
            slug: true,
            collection: {
              select: {
                slug: true,
                translations: {
                  where: {
                    language: input.locale,
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
                price: Prisma.SortOrder.asc,
              },
            },
            translations: {
              where: {
                language: input.locale,
              },
              select: {
                name: true,
                description: true,
              },
            },
          },
          take: input.take,
          skip: input.skip,
          orderBy: orderBy,
        });

        return { productsCount, products: mapProductsToDTO(products) };
      },
    ),
  // GET PRODUCTS BY COLLECTION SLUG
  getProductsByCollectionSlug: publicProcedure
    .input(getProductsByCollectionSlugSchema)
    .query(async ({ ctx, input }): Promise<ProductDTO[]> => {
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
                  language: input.locale,
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
              language: input.locale,
            },
            select: {
              name: true,
              description: true,
            },
          },
        },
      });

      return mapProductsToDTO(products);
    }),
});
