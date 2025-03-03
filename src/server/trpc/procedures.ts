import { t } from "./";
import { adminMiddleware, timingMiddleware } from "./middlewares";

export const publicProcedure = t.procedure.use(timingMiddleware);

export const adminProcedure = t.procedure
  .use(adminMiddleware)
  .use(timingMiddleware);
