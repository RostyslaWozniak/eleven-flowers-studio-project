import { createCallerFactory, createTRPCRouter } from "@/server/trpc";
import { publicRouter } from "../routers/public";
import { adminRouter } from "../routers/admin";
import { cronRouter } from "../routers/cron";

export const appRouter = createTRPCRouter({
  public: publicRouter,
  admin: adminRouter,
  cron: cronRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
