import { StripeService } from "@/server/modules/stripe/stripe.service";
import { createTRPCRouter } from "@/server/trpc";
import { publicProcedure } from "@/server/trpc/procedures";

export const stripeRouter = createTRPCRouter({
  getClientSessionSecret: publicProcedure.query(async ({ ctx }) => {
    return await StripeService.getClientSessionSecret(ctx.req);
  }),
});
