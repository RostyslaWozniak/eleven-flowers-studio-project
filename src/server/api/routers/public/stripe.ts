import { createTRPCRouter, publicProcedure } from "../../trpc";
import { stripeServerClient } from "@/lib/stripe/stripe-server";
import {
  getCookieValue,
  getLocaleFromCookie,
  ORDER_COOKIE_NAME,
} from "@/lib/utils/cookies";
import { TRPCError } from "@trpc/server";
import { getTranslations } from "next-intl/server";

export const stripeRouter = createTRPCRouter({
  getClientSessionSecret: publicProcedure.query(async ({ ctx }) => {
    const orderId = getCookieValue(ctx.req, ORDER_COOKIE_NAME);
    if (!orderId) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "order_not_found",
      });
    }

    const order = await ctx.db.order.findUnique({
      where: {
        id: orderId,
        paymentStatus: "PENDING",
      },
      select: {
        id: true,
        contactInfo: {
          select: {
            email: true,
            firsName: true,
            lastName: true,
          },
        },
        orderItems: {
          select: {
            size: true,
            price: true,
            quantity: true,
            product: {
              select: {
                translations: {
                  select: {
                    name: true,
                  },
                  where: {
                    language: "pl",
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });
    if (!order) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "order_not_found",
      });
    }

    const locale = getLocaleFromCookie(ctx.req);

    const sizeTranslatedWord = await getTranslations({
      locale,
      namespace: "payment.order_summary",
    });

    const lineItems = order.orderItems.map((item) => {
      if (item.price == null || item.price <= 0) {
        throw new Error(
          `Invalid price for item: ${item.product.translations[0]?.name}`,
        );
      }

      return {
        quantity: item.quantity,
        price_data: {
          currency: "pln",
          product_data: {
            name: `${item.product.translations[0]?.name} - ${sizeTranslatedWord("size")}: ${item.size.toUpperCase()}  x ${item.quantity}`,
          },
          unit_amount: item.price,
        },
      };
    });

    const session = await stripeServerClient.checkout.sessions.create({
      line_items: lineItems,
      ui_mode: "embedded",
      mode: "payment",
      locale: locale,
      return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/webhooks/stripe?stripeSessionId={CHECKOUT_SESSION_ID}`,
      customer_email: order.contactInfo?.email,
      payment_intent_data: {
        receipt_email: order.contactInfo?.email,
      },
      metadata: {
        orderId: order.id,
      },
    });

    if (session.client_secret == null) throw new Error("Client secret is null");

    return session.client_secret;
  }),
});
