import { createTRPCRouter } from "@/server/trpc";
import { productsRouter } from "./products";
import { collectionsRouter } from "./collections";
import { imagesRouter } from "./images";
import { ordersRouter } from "./orders";

export const adminRouter = createTRPCRouter({
  products: productsRouter,
  collections: collectionsRouter,
  images: imagesRouter,
  orders: ordersRouter,
});
