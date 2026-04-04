import { PurchaseSucceedTemplate } from "@/components/emails/purchase-succeed-template";
import { env } from "@/env";
import { sendMessageAction } from "@/features/telegram/actions/send-message.action";
import { type Locale, redirect } from "@/i18n/routing";
import { stripeServerClient } from "@/lib/stripe/stripe-server";
import { validateLang } from "@/lib/utils";
import { db } from "@/server/db";
import { sendEmail } from "@/services/resend";
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
  const sig = req.headers.get("stripe-signature");
  if (!sig) return new Response("Missing signature", { status: 400 });

  const event = stripeServerClient.webhooks.constructEvent(
    await req.text(),
    sig,
    env.STRIPE_WEBHOOK_SECRET,
  );

  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded": {
      try {
        await processStripeCheckout(event.data.object);
      } catch {
        return new Response(null, { status: 500 });
      }
    }
  }
  return new Response(null, { status: 200 });
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
      order: { ...updatedOrder, items: updatedOrder.orderItems },
      locale,
    }),
  });
  // await sendMessageAction(
  //   `Payment for order from ${customer ? customer.name : "Customer"}.  ${orderPrice ? `Price: ${orderPrice}zł.` : ""} ACCEPTED`,
  // );
  await sendMessageAction(
    `<b>✅ Payment Accepted</b><br>
<b>Customer:</b> ${customer ? customer.name : "Customer"}<br>
${orderPrice ? `<b>Amount:</b> ${orderPrice} zł<br>` : ""}`,
  );

  return orderId;
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
    },
  });
  if (!customer) return null;
  return {
    name: customer.name,
    email: customer.email,
  };
}

async function updateOrder(orderId: string, paymantIntentId: string | null) {
  return await db.order.update({
    where: {
      id: orderId,
    },
    data: {
      paymentStatus: "SUCCESS",
      paymentIntentId: paymantIntentId,
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
