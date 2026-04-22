import {
  ordererFormSchema,
  pickupDatAndTimeFormSchema,
} from "@/features/forms/order-form/lib/schema";

import { OrderSchema } from "@/server/modules/order/order.schema";
import { OrderService } from "@/server/modules/order/order.service";
import { createTRPCRouter } from "@/server/trpc";
import { publicProcedure } from "@/server/trpc/procedures";

import { z } from "zod";

export const orderRouter = createTRPCRouter({
  createWithDetails: publicProcedure
    .input(OrderSchema.createWithDetails)
    .mutation(async ({ ctx, input }) => {
      return await OrderService.createWithDetails(
        ctx.req,
        ctx.resHeaders,
        input,
      );
    }),

  createPickupOrder: publicProcedure
    .input(
      z.object({
        pickupDatAndTimeFormData: pickupDatAndTimeFormSchema,
        orderingFormData: ordererFormSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log(input);
      return await OrderService.createPickupOrder(
        ctx.req,
        ctx.resHeaders,
        input,
      );
    }),

  getOrder: publicProcedure.query(async ({ ctx }) => {
    return await OrderService.getOrThrow(ctx.req);
  }),

  removeOrderIfStatusPending: publicProcedure.query(async ({ ctx }) => {
    return await OrderService.remove(ctx.req, ctx.resHeaders);
  }),
});
