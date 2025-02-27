import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

import { db } from "@/server/db";
import { type NextRequest } from "next/server";
import { getCookieValue } from "@/lib/utils/cookies";
import { validateAdmin } from "./routers/lib/validate-admin";

export const createTRPCContext = async (opts: {
  req: NextRequest;
  resHeaders: Headers;
}) => {
  return {
    db,
    ...opts,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createCallerFactory = t.createCallerFactory;

export const createTRPCRouter = t.router;

const timingMiddleware = t.middleware(async ({ next, path }) => {
  const start = Date.now();

  // if (t._config.isDev) {
  //   // artificial delay in dev
  //   const waitMs = Math.floor(Math.random() * 400) + 100;
  //   await new Promise((resolve) => setTimeout(resolve, waitMs));
  // }

  const result = await next();

  const end = Date.now();
  console.log(`[TRPC] ${path} took ${end - start}ms to execute`);

  return result;
});

export const publicProcedure = t.procedure.use(timingMiddleware);

export const adminProcedure = t.procedure.use(
  t.middleware(async ({ ctx, next }) => {
    const cookiesValue = getCookieValue(ctx.req, "admin");
    const authorization =
      ctx.resHeaders.get("Authorization")?.split(" ")[1] ??
      ctx.resHeaders.get("authorization")?.split(" ")[1] ??
      null;

    const result = cookiesValue ?? authorization;

    const isAuthnticated = await validateAdmin(result);

    if (!isAuthnticated) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Unauthorized",
      });
    }

    return next();
  }),
);
