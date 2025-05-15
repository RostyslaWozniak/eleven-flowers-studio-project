import { createTRPCRouter } from "@/server/trpc";
import { productsRouter } from "./products";
import { collectionsRouter } from "./collections";
import { cartRouter } from "./cart";
import { orderRouter } from "./order";
import { stripeRouter } from "./stripe";
import { subscribersRouter } from "./subscribers";
import { googleRouter } from "./google";

export const publicRouter = createTRPCRouter({
  products: productsRouter,
  collections: collectionsRouter,
  cart: cartRouter,
  order: orderRouter,
  stripe: stripeRouter,
  subscribers: subscribersRouter,
  google: googleRouter,
});
