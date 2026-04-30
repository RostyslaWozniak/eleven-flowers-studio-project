import { createTRPCRouter } from "@/server/trpc";
import { orderRouter } from "./orders";

export const cronRouter = createTRPCRouter({
  order: orderRouter,
});
