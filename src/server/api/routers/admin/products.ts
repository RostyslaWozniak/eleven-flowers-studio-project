import { addProductSchema } from "@/lib/validation/product";
import { adminProcedure, createTRPCRouter } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { ADMIN_PRODUCT_SELECT_FIELDS } from "./services/products-queries";
import { mapAdminProductsToDto } from "./dto/admin-product-dto";

export const productsRouter = createTRPCRouter({
  createProduct: adminProcedure
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

  getProducts: adminProcedure.query(async ({ ctx }) => {
    const productsCount = await ctx.db.product.count();

    const products = await ctx.db.product.findMany({
      select: ADMIN_PRODUCT_SELECT_FIELDS,
    });

    return { products: mapAdminProductsToDto(products), productsCount };
  }),
});
