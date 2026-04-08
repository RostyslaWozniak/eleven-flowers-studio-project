import { type NextRequest } from "next/server";
import { OrderService } from "../order/order.service";
import { TRPCError } from "@trpc/server";
import { type OrderDTO } from "../order/order.types";
import { getTranslations } from "next-intl/server";
import { type Locale } from "@/i18n/routing";
import type Stripe from "stripe";
import { stripeServerClient } from "@/lib/stripe/stripe-server";
import { ContactInfoService } from "../contact-info/contact-info.service";
import { getLocaleFromCookie } from "@/lib/utils/cookies";
// import { sendMessageAction } from "@/features/telegram/actions/send-message.action";
// import { format } from "date-fns";
import { IS_TEST_PROJECT } from "@/components/environment-banner";

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

    const locale = getLocaleFromCookie(req);

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
    // const orderItemsRow = order.orderItems
    //   .map(
    //     (item) =>
    //       `<i>- ${item.productName} x ${item.quantity}, size: ${item.size.toUpperCase()}</i>`,
    //   )
    //   .join(", \n");
    // await sendMessageAction(
    //   `
    // New order from ${contactInfo.name ?? "Customer"}.
    // <b>Phone</b>: ${contactInfo.phone}.
    // <b>Email</b>: ${contactInfo.email}.
    // <b>Order Price</b>: ${order.totalPrice / 100}zł..
    // <b>Delivery Price</b>: ${order.deliveryPrice / 100}zł..
    // <b>Order</b>:\n<u>${orderItemsRow}</u>
    // ${order.deliveryDetails.flowerMessage ? `<b>Flower Message</b>: ${order.deliveryDetails.flowerMessage}` : ""}
    // <b>Address</b>:
    // <u>${order.address.city} ${order.address.postCode}, ${order.address.street}</u>
    // <b>Date</b>: <u>${format(order.deliveryDetails.deliveryDate, "PPP")}</u>
    // <b>Time</b>: <u>${order.deliveryDetails.deliveryTime}</u>
    // ${order.deliveryDetails.description ? `<b>Instructions</b>: <u>${order.deliveryDetails.description}</u>` : ""}
    // <b>Recipient Name: ${order.deliveryDetails.name}</b>
    // <b>Recipient Phone: ${order.deliveryDetails.phone}</b>`,
    // );

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
    const session = await stripeServerClient.checkout.sessions.create(
      {
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
      },
      {
        idempotencyKey: orderId,
      },
    );

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
        unit_amount: IS_TEST_PROJECT ? 0 : order.deliveryPrice,
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
