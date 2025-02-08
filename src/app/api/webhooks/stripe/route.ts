import { PurchaseSucceedTemplate } from "@/components/emails/purchase-succeed-template";
import { redirect } from "@/i18n/routing";
import { stripeServerClient } from "@/lib/stripe/stripe-server";
import { db } from "@/server/db";
import { sendEmail } from "@/services/resend";
import { type NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";

export async function GET(req: NextRequest) {
  const stripeSessionId = req.nextUrl.searchParams.get("stripeSessionId");

  const locale = req.cookies.get("NEXT_LOCALE")?.value ?? "en";
  if (!stripeSessionId)
    return redirect({ locale: locale, href: "/checkout/purchase-failure" });

  let redirectUrl: string;

  try {
    const checkoutSession = await stripeServerClient.checkout.sessions.retrieve(
      stripeSessionId,
      { expand: ["line_items"] },
    );
    await processStripeCheckout(checkoutSession);
    redirectUrl = `/${locale}/checkout/purchase-success`;
  } catch (error) {
    console.log(error);
    redirectUrl = `/${locale}/checkout/purchase-failure`;
  }

  return NextResponse.redirect(new URL(redirectUrl, req.url));
}

async function processStripeCheckout(checkoutSession: Stripe.Checkout.Session) {
  const orderId = checkoutSession.metadata?.orderId;

  if (orderId == null) {
    throw new Error("Missing metadata");
  }

  await updateOrder(orderId);
  console.log({ checkoutSession });
  console.log({ locale: checkoutSession.locale }); //checkoutSession.locale

  await sendEmail({
    email: "rostik19wozniak@gmail.com",
    subject: "New Order",
    emailTemplate: PurchaseSucceedTemplate({
      firstName: "Rostyslav",
      lastName: "Vozniak",
      price: checkoutSession.amount_total,
    }),
  });

  return orderId;
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
