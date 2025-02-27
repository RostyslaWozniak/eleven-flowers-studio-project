import { createTRPCRouter, publicProcedure } from "../../trpc";
import { stripeServerClient } from "@/lib/stripe/stripe-server";
import {
  getCookieValue,
  getLocaleFromCookie,
  ORDER_COOKIE_NAME,
} from "@/lib/utils/cookies";
import { checkDelivery, MIN_FREE_DELIVERY_PRICE } from "@/lib/utils/delivery";
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

    const locale = getLocaleFromCookie(ctx.req);

    const order = await ctx.db.order.findUnique({
      where: {
        id: orderId,
      },
      select: {
        id: true,
        locale: true,
        paymentStatus: true,
        totalPrice: true,
        address: {
          select: {
            postCode: true,
          },
        },
        contactInfo: {
          select: {
            email: true,
            name: true,
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
                    language: locale,
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

    if (order.paymentStatus === "SUCCESS") {
      return {
        stripeSession: null,
      };
    }

    const sizeTranslatedWord = await getTranslations({
      locale,
      namespace: "payment.order_summary",
    });

    const postalCode = order.address?.postCode;

    if (!postalCode) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "postal_code_not_found",
      });
    }

    const deliveryData = checkDelivery(postalCode);

    if (!deliveryData.price) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: deliveryData.message,
      });
    }
    let delivery;
    const t = await getTranslations({ locale, namespace: "payment" });
    if (order.totalPrice < MIN_FREE_DELIVERY_PRICE) {
      delivery = {
        quantity: 1,
        price_data: {
          currency: "pln",
          product_data: {
            name: t("delivery"),
          },
          unit_amount: deliveryData.price * 100, // in cents
        },
      };
    } else {
      delivery = {
        quantity: 1,
        price_data: {
          currency: "pln",
          product_data: {
            name: t("delivery"),
          },
          unit_amount: 0, // in cents
        },
      };
    }

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
      line_items: [...lineItems, delivery],
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
        locale,
      },
    });

    if (session.client_secret == null) throw new Error("Client secret is null");

    return {
      stripeSession: session.client_secret,
    };
  }),
});
