import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { StripeCheckoutForm } from "./_components/stripe-checkout-form";

export default function Page() {
  return (
    <section className="py-12 md:py-20">
      <MaxWidthWrapper>
        <StripeCheckoutForm />
      </MaxWidthWrapper>
    </section>
  );
}
