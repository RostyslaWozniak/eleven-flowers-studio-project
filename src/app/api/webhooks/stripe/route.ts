import { PurchaseSucceedTemplate } from "@/components/emails/purchase-succeed-template";
import { env } from "@/env";
import { redirect } from "@/i18n/routing";
import { stripeServerClient } from "@/lib/stripe/stripe-server";
import { validateLang } from "@/lib/utils";
import { db } from "@/server/db";
import { sendEmail } from "@/services/resend";
import { sendSms } from "@/services/twilio";
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

  await updateOrder(orderId);

  const customer = await getCustomerInfo(checkoutSession.customer_email);

  const orderPrice = checkoutSession.amount_total
    ? checkoutSession.amount_total / 100
    : null;

  await sendEmail({
    email: customer ? customer.email : checkoutSession.customer_email,
    subject: "Thank you for your purchase!",
    emailTemplate: PurchaseSucceedTemplate({
      name: customer ? customer.name : null,
      price: orderPrice,
      locale,
    }),
  });

  await sendSms({
    number: "+48798582849",
    message: `New order from Eleven Flowers Studio. Price: ${orderPrice} zł.`,
  });

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

async function updateOrder(orderId: string) {
  await db.order.updateMany({
    where: {
      id: orderId,
    },
    data: {
      paymentStatus: "SUCCESS",
    },
  });
}
