import { subscribeFormSchema } from "@/lib/validation/subscribe-form-schema";
import { unsubscribeSchema } from "@/server/modules/contact-info/contact-info.schema";
import { ContactInfoService } from "@/server/modules/contact-info/contact-info.service";
import { createTRPCRouter } from "@/server/trpc";
import { publicProcedure } from "@/server/trpc/procedures";

export const subscribersRouter = createTRPCRouter({
  subscribe: publicProcedure
    .input(subscribeFormSchema)
    .mutation(async ({ input }) => {
      return await ContactInfoService.subscribe(input);
    }),

  unsubscribe: publicProcedure
    .input(unsubscribeSchema)
    .mutation(async ({ input }) => {
      return await ContactInfoService.unsubscribe(input.email);
    }),
});
