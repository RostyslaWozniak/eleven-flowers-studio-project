import { addProductSchema } from "@/lib/validation/product";
import { adminProcedure, createTRPCRouter } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { ADMIN_PRODUCT_SELECT_FIELDS } from "./services/products-queries";
import { mapAdminProductsToDto } from "./dto/admin-product-dto";
import { z } from "zod";
import { $Enums } from "@prisma/client";

export const productsRouter = createTRPCRouter({
  create: adminProcedure
    .input(addProductSchema)
    .mutation(async ({ ctx, input }) => {
      const { slug, collection, translations, prices, images } = input;

      const existingCollection = await ctx.db.collection.findUnique({
        where: {
          slug: collection,
        },
        select: {
          id: true,
        },
      });

      if (!existingCollection)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Collection not found",
        });

      const translationsData = Object.entries(translations).map(
        ([key, value]) => ({
          language: key,
          name: value.name,
          description: value.description,
        }),
      );
      const pricesData = prices.map(({ size, price }) => ({
        size: size,
        price: price * 100,
      }));
      const imagesData = images.map((image) => ({ url: image }));
      try {
        const newProduct = await ctx.db.product.create({
          data: {
            slug,
            collection: {
              connect: {
                id: existingCollection.id,
              },
            },
            translations: {
              createMany: { data: translationsData },
            },
            prices: {
              createMany: {
                data: pricesData,
              },
            },
            images: {
              createMany: {
                data: imagesData,
              },
            },
          },
        });

        return newProduct.id;
      } catch (e) {
        console.log((e as Error).message);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),

  getAll: adminProcedure.query(async ({ ctx }) => {
    const productsCount = await ctx.db.product.count();

    const products = await ctx.db.product.findMany({
      select: ADMIN_PRODUCT_SELECT_FIELDS,
    });

    return { products: mapAdminProductsToDto(products), productsCount };
  }),

  changeStatus: adminProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.enum([
          $Enums.ProductStatus.AVAILABLE,
          $Enums.ProductStatus.DISCONTINUED,
          $Enums.ProductStatus.OUT_OF_STOCK,
        ]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.product.update({
        where: {
          id: input.id,
        },
        data: {
          status: input.status,
        },
      });
    }),

  update: adminProcedure
    .input(addProductSchema)
    .mutation(async ({ ctx, input }) => {
      const product = await ctx.db.product.findUnique({
        where: {
          slug: input.slug,
        },
      });

      if (!product) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Product not found",
        });
      }

      const existingCollection = await ctx.db.collection.findUnique({
        where: {
          slug: input.collection,
        },
        select: {
          id: true,
        },
      });

      if (!existingCollection)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Collection not found",
        });

      const translationsData = Object.entries(input.translations).map(
        ([key, value]) => ({
          language: key,
          name: value.name,
          description: value.description,
        }),
      );
      const pricesData = input.prices.map(({ size, price }) => ({
        size: size,
        price: price * 100,
      }));
      const imagesData = input.images.map((image) => ({ url: image }));

      const updatedProduct = await ctx.db.product.update({
        where: {
          slug: input.slug,
        },
        data: {
          translations: {
            deleteMany: {},
            createMany: {
              data: translationsData,
            },
          },

          prices: {
            deleteMany: {},
            createMany: {
              data: pricesData,
            },
          },
          images: {
            deleteMany: {},
            createMany: {
              data: imagesData,
            },
          },
          collectionId: existingCollection.id,
        },
      });

      return updatedProduct.id;
    }),

  delete: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.product.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
