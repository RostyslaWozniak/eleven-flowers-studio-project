import { ProductSchema } from "@/server/modules/product/product.schema";
import { ProductService } from "@/server/modules/product/product.service";
import { createTRPCRouter } from "@/server/trpc";
import { publicProcedure } from "@/server/trpc/procedures";
import type { ProductDTO } from "@/types";

export const productsRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(ProductSchema.getAll)
    .query(
      async ({
        input,
      }): Promise<{ products: ProductDTO[]; productsCount: number }> => {
        return await ProductService.getAll(input);
      },
    ),

  getById: publicProcedure
    .input(ProductSchema.getProductById)
    .query(async ({ input }): Promise<ProductDTO> => {
      return await ProductService.getByIdOrThrow(input.id);
    }),

  getBySlug: publicProcedure
    .input(ProductSchema.getProductBySlug)
    .query(async ({ input }): Promise<ProductDTO | null> => {
      const product = await ProductService.getBySlug(input.slug);
      return product;
    }),

  getManyByColectionSlug: publicProcedure
    .input(ProductSchema.getManyByColectionSlug)
    .query(
      async ({
        input,
      }): Promise<{ products: ProductDTO[]; productsCount: number }> => {
        return await ProductService.getManyByColectionSlug(input);
      },
    ),

  getRelated: publicProcedure
    .input(ProductSchema.getRelated)
    .query(async ({ input }): Promise<ProductDTO[]> => {
      return await ProductService.getRelated(input);
    }),
});
