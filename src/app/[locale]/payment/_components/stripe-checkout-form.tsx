"use client";

import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { stripeClientPromise } from "@/lib/stripe/stripe-client";
import { api } from "@/trpc/react";

export function StripeCheckoutForm() {
  const { data, error } = api.public.stripe.getClientSessionSecret.useQuery();

  if (!data) return null;
  return (
    <>
      {data && !error && (
        <EmbeddedCheckoutProvider
          stripe={stripeClientPromise}
          options={{
            fetchClientSecret: async () => {
              return data;
            },
          }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </>
  );
}
