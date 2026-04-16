import { PurchaseSucceedTemplate } from "@/components/emails/purchase-succeed-template";
import { IS_TEST_PROJECT } from "@/components/environment-banner";
import { env } from "@/env";
import { sendMessageAction } from "@/features/telegram/actions/send-message.action";
import { sendTelegramMessage } from "@/features/telegram/lib/helpers";
import { type Locale, redirect } from "@/i18n/routing";
import { stripeServerClient } from "@/lib/stripe/stripe-server";
import { validateLang } from "@/lib/utils";
import { db } from "@/server/db";
import { sendEmail } from "@/services/resend";
import { format } from "date-fns";
import { type NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";

export async function GET(req: NextRequest) {
  const stripeSessionId = req.nextUrl.searchParams.get("stripeSessionId");

  const locale = req.cookies.get("NEXT_LOCALE")?.value ?? "en";
  if (!stripeSessionId)
    return redirect({ locale: locale, href: "/payment/purchase-failure" });

  let redirectUrl: string;

  try {
    await stripeServerClient.checkout.sessions.retrieve(stripeSessionId, {
      expand: ["line_items"],
    });
    redirectUrl = `/${locale}/payment/purchase-success`;
  } catch (error) {
    console.log(error);
    redirectUrl = `/${locale}/payment/purchase-failure`;
  }

  return NextResponse.redirect(new URL(redirectUrl, req.url));
}

export async function POST(req: NextRequest) {
  try {
    const sig = req.headers.get("stripe-signature");
    if (!sig) return new Response("Missing signature", { status: 400 });

    const event = stripeServerClient.webhooks.constructEvent(
      await req.text(),
      sig,
      env.STRIPE_WEBHOOK_SECRET,
    );

    console.log("EVENT:", event.type, event.id);

    await sendTelegramMessage({
      text: `${IS_TEST_PROJECT ? "TEST" : "PRODUCTION"} STRIPE WEBHOOK: 
      <b>Event Type</b>: ${event.type}
      <b>Event ID</b>: ${event.id}
      <b>Metadata</b>: ${JSON.stringify(event.data.object)}
      `,
      chatId: "6868922856",
    });

    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded": {
        await processStripeCheckout(event.data.object);
        break;
      }
    }
    return new Response(null, { status: 200 });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : JSON.stringify(err);
    await sendTelegramMessage({
      text: `WEBHOOK ERROR: ${errorMessage}`,
      chatId: "6868922856",
    });
    console.error("WEBHOOK ERROR:", err);

    return new Response(null, { status: 200 });
  }
}

async function processStripeCheckout(checkoutSession: Stripe.Checkout.Session) {
  const orderId = checkoutSession.metadata?.orderId;
  const locale = validateLang(checkoutSession.metadata?.locale);

  if (orderId == null) {
    throw new Error("Missing metadata");
  }

  const paymentIntentId = checkoutSession.payment_intent
    ? typeof checkoutSession.payment_intent === "string"
      ? checkoutSession.payment_intent
      : checkoutSession.payment_intent.id
    : null;

  const existingOrder = await db.order.findUnique({
    where: { id: orderId },
  });

  if (!existingOrder) {
    console.error("Order not found:", orderId);
    throw new Error(`Order not found: ${orderId}`);
  }

  if (existingOrder.paymentStatus === "SUCCESS") {
    return;
  }

  const updatedOrder = await updateOrder(orderId, paymentIntentId);

  const customer = await getCustomerInfo(checkoutSession.customer_email);

  const orderPrice = checkoutSession.amount_total
    ? checkoutSession.amount_total / 100
    : null;

  await sendEmail({
    email: customer ? customer.email : checkoutSession.customer_email,
    subject: getEmailTitleByLang(locale),
    emailTemplate: PurchaseSucceedTemplate({
      name: customer ? customer.name : null,
      price: orderPrice,
      order: updatedOrder
        ? { ...updatedOrder, items: updatedOrder?.orderItems }
        : undefined,
      locale,
    }),
  });

  const orderItemsRow = updatedOrder.orderItems
    .map(
      (item) =>
        `<i>- ${item.productName} x ${item.quantity}, size: ${item.size.toUpperCase()}</i>`,
    )
    .join(", \n");
  await sendMessageAction(
    `
    Check order here: ${env.NEXT_PUBLIC_SERVER_URL}/dashboard/orders/${orderId}
  New order from ${customer?.name ?? "Customer"}.
  <b>Phone</b>: ${customer?.phone}.
  <b>Email</b>: ${customer?.email}.
  <b>Order Price</b>: ${orderPrice}zł..
  <b>Delivery Price</b>: ${updatedOrder.deliveryPrice / 100}zł..
  <b>Order</b>:\n<u>${orderItemsRow}</u>
  ${updatedOrder.deliveryDetails?.flowerMessage ? `<b>Flower Message</b>: ${updatedOrder.deliveryDetails.flowerMessage}` : ""}
  <b>Address</b>:
  <u>${updatedOrder.address.city} ${updatedOrder.address.postCode}, ${updatedOrder.address.street}</u>
  ${updatedOrder.deliveryDetails?.deliveryDate && `<b>Date</b>: <u>${format(updatedOrder.deliveryDetails.deliveryDate, "PPP")}</u>`}
  <b>Time</b>: <u>${updatedOrder.deliveryDetails?.deliveryTime}</u>
  ${updatedOrder.deliveryDetails?.description ? `<b>Instructions</b>: <u>${updatedOrder.deliveryDetails.description}</u>` : ""}
  <b>Recipient Name: ${updatedOrder.deliveryDetails?.name}</b>
  <b>Recipient Phone: ${updatedOrder.deliveryDetails?.phone}</b>`,
  );
}

async function getCustomerInfo(customerEmail: string | null) {
  if (!customerEmail) return null;
  const customer = await db.contactInfo.findUnique({
    where: {
      email: customerEmail,
    },
    select: {
      email: true,
      name: true,
      phone: true,
    },
  });
  if (!customer) return null;
  return customer;
}

async function updateOrder(orderId: string, paymentIntentId: string | null) {
  return await db.order.update({
    where: {
      id: orderId,
    },
    data: {
      paymentStatus: "SUCCESS",
      paymentIntentId,
    },
    select: {
      deliveryPrice: true,
      createdAt: true,
      orderItems: {
        select: {
          productName: true,
          quantity: true,
          size: true,
          price: true,
        },
      },
      deliveryDetails: {
        select: {
          deliveryDate: true,
          deliveryTime: true,
          flowerMessage: true,
          description: true,
          name: true,
          phone: true,
        },
      },
      address: {
        select: {
          city: true,
          postCode: true,
          street: true,
        },
      },
    },
  });
}

function getEmailTitleByLang(locale: Locale) {
  switch (locale) {
    case "pl":
      return "Dziękujemy za zakup!";
    case "ru":
      return "Спасибо за покупку!";
    case "en":
      return "Thank you for your purchase!";
    default:
      return "Thank you for your purchase!";
  }
}
