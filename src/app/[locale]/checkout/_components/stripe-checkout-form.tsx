"use client";

import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

import { useCart } from "@/context/cart-context";
import { stripeClientPromise } from "@/lib/stripe/stripe-client";
import { api } from "@/trpc/react";

export function StripeCheckoutForm() {
  const { storedCartId } = useCart();
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const { data } = api.public.stripe.getClientSessionSecret.useQuery({
    cartId: storedCartId,
    userId: userId,
  });

  if (!data) return null;
  return (
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
  );
}
