import { type NextRequest } from "next/server";
import { OrderService } from "../order/order.service";
import { TRPCError } from "@trpc/server";
import { type OrderDTO } from "../order/order.types";
import { getLocale, getTranslations } from "next-intl/server";
import { validateLang } from "@/lib/utils";
import { type Locale } from "@/i18n/routing";
import type Stripe from "stripe";
import { stripeServerClient } from "@/lib/stripe/stripe-server";
import { ContactInfoService } from "../contact-info/contact-info.service";

export class StripeService {
  public static getClientSessionSecret = async (
    req: NextRequest,
  ): Promise<{ stripeSession: string }> => {
    const order = await OrderService.getOrThrow(req);

    if (order.paymentStatus === "SUCCESS")
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "already_paid",
      });

    const locale = await getLocale().then(validateLang);

    const lineItems = await this.getStripeLineItems(order, locale);

    const contactInfo = await ContactInfoService.getByIdOrThrow(
      order.contactInfoId,
    );

    const sessionClientSecret = await this.createCheckoutSession(
      contactInfo.email,
      lineItems,
      locale,
      order.id,
    );

    return {
      stripeSession: sessionClientSecret,
    };
  };

  private static createCheckoutSession = async (
    customerEmail: string,
    lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
    locale: Locale,
    orderId: string,
  ): Promise<string> => {
    const session = await stripeServerClient.checkout.sessions.create({
      line_items: lineItems,
      ui_mode: "embedded",
      mode: "payment",
      locale: locale,
      return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/webhooks/stripe?stripeSessionId={CHECKOUT_SESSION_ID}`,
      customer_email: customerEmail,
      payment_intent_data: {
        receipt_email: customerEmail,
      },

      metadata: {
        orderId,
        locale,
      },
    });

    if (session.client_secret == null)
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "stripe_client_secret_is_null",
      });

    return session.client_secret;
  };

  private static getStripeLineItems = async (
    order: OrderDTO,
    locale: Locale,
  ): Promise<Stripe.Checkout.SessionCreateParams.LineItem[]> => {
    const t = await getTranslations({
      locale,
      namespace: "payment",
    });
    const deliveryData = {
      quantity: 1,
      price_data: {
        currency: "pln",
        product_data: {
          name: `${t("delivery")}`,
        },
        unit_amount: order.deliveryPrice,
      },
    };

    const lineItems = order.orderItems.map((item) => {
      if (item.price == null || item.price <= 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `invalid_price: ${item.productName}`,
        });
      }

      return {
        quantity: item.quantity,
        price_data: {
          currency: "pln",
          product_data: {
            name: `${item.productName} - ${t("order_summary.size")}: ${item.size.toUpperCase()}  x ${item.quantity}`,
          },
          unit_amount: item.price,
        },
      };
    });

    return [...lineItems, deliveryData];
  };
}
