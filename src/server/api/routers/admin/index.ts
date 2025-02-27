import { createTRPCRouter } from "../../trpc";
import { collectionsRouter } from "./collections";
import { imagesRouter } from "./images";
import { orderRouter } from "./orders";
import { productsRouter } from "./products";

export const adminRouter = createTRPCRouter({
  collections: collectionsRouter,
  images: imagesRouter,
  orders: orderRouter,
  products: productsRouter,
});
