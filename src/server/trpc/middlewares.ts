import { getCookieValue } from "@/lib/utils/cookies";
import { t } from "./index";
// import { validateAdmin } from "../api/routers/lib/validate-admin";
import { TRPCError } from "@trpc/server";
import { validateAdmin } from "../lib/auth/validate-admin";

export const timingMiddleware = t.middleware(async ({ next, path }) => {
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

export const adminMiddleware = t.middleware(async ({ ctx, next }) => {
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
});
