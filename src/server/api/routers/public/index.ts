import { createTRPCRouter } from "../../trpc";
import { cartRouter } from "./cart";
import { collectionsRouter } from "./collections";
import { orderRouter } from "./order";
import { productsRouter } from "./products";
import { stripeRouter } from "./stripe";
import { userRouter } from "./user";

export const publicRouter = createTRPCRouter({
  products: productsRouter,
  collections: collectionsRouter,
  cart: cartRouter,
  order: orderRouter,
  user: userRouter,
  stripe: stripeRouter,
});
