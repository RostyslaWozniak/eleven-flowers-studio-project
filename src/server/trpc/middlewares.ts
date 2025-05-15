import { t } from "./index";
import { TRPCError } from "@trpc/server";
import { getCurrentUser } from "@/auth/current-user";
import { env } from "@/env";

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

export const adminMiddleware = t.middleware(async ({ next }) => {
  const user = await getCurrentUser();
  if (!user)
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Unauthorized",
    });

  if (
    user.username === env.ADMIN_HASHED_USERNAME &&
    user.passwordHash === env.ADMIN_HASHED_PASSWORD
  ) {
    return next();
  }

  throw new TRPCError({
    code: "UNAUTHORIZED",
    message: "Unauthorized",
  });
});
