import { createTRPCRouter } from "../../trpc";
import { productsRouter } from "./products";

export const adminRouter = createTRPCRouter({
  products: productsRouter,
});
