"use client";

import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { stripeClientPromise } from "@/lib/stripe/stripe-client";
import { api } from "@/trpc/react";
import { H1, H3 } from "@/components/ui/typography";
import { $Enums } from "@prisma/client";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export function StripeCheckoutForm() {
  const { data, error } = api.public.stripe.getClientSessionSecret.useQuery();

  const t = useTranslations("payment.order_summary");

  if (!data) return null;
  if (error) return <H1>Something went wrong!</H1>;

  return (
    <>
      {data.isPayed === $Enums.PaymentStatus.PENDING ? (
        <EmbeddedCheckoutProvider
          stripe={stripeClientPromise}
          options={{
            fetchClientSecret: async () => {
              return data.stripeSession;
            },
          }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      ) : (
        <div className="flex h-full flex-col items-center justify-center">
          <H3>{t("already_paid")}</H3>
          <div className="mt-8 space-y-4">
            <Link
              href="/products"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              {t("button")}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
