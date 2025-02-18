import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import OrderItemsList from "./_components/order-items-list";
import { StripeCheckoutForm } from "./_components/stripe-checkout-form";

export default function Page() {
  return (
    <section className="pb-8 md:py-12">
      <MaxWidthWrapper>
        <div className="space-y-12 lg:flex lg:space-x-8">
          <div className="mt-8 w-full">
            <OrderItemsList />
          </div>
          <div className="w-full">
            <StripeCheckoutForm />
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
