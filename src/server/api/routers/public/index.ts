import { createTRPCRouter } from "../../trpc";
import { collectionsRouter } from "./collections";
import { productsRouter } from "./products";

export const publicRouter = createTRPCRouter({
  products: productsRouter,
  collections: collectionsRouter,
});
