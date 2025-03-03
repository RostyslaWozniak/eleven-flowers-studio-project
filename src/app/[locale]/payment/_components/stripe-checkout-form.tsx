"use client";

import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { stripeClientPromise } from "@/lib/stripe/stripe-client";
import { api } from "@/trpc/react";
import { H3 } from "@/components/ui/typography";
import { Link, redirect } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useLocale, useTranslations } from "next-intl";
import { Loader } from "lucide-react";
import { toast } from "sonner";

export function StripeCheckoutForm() {
  const { data, error, isLoading } =
    api.public.stripe.getClientSessionSecret.useQuery();
  const locale = useLocale();

  const t = useTranslations("payment.order_summary");

  if (error) {
    if (error.data?.code === "BAD_REQUEST") {
      toast.error(t("already_paid"));
      redirect({ href: "/", locale: locale });
    }

    return <H3 className="text-center">Something went wrong</H3>;
  }

  return (
    <>
      {isLoading ? (
        <div className="absolute inset-0 grid place-items-center bg-white">
          <Loader size={40} className="animate-spin" />
        </div>
      ) : data?.stripeSession ? (
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
          <H3 className="text-center">{t("already_paid")}</H3>
          <div className="mt-8 flex w-full justify-center space-y-4">
            <Link
              href="/products"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "w-full md:w-min",
              )}
            >
              {t("button")}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
