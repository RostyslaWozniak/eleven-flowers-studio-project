import { env } from "@/env";
import { loadStripe } from "@stripe/stripe-js";

export const stripeClientPromise = loadStripe(
  env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);
