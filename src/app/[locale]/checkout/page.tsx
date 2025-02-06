import { H1 } from "@/components/ui/typography";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";

export default function Page() {
  return (
    <section className="min-h-screen py-12">
      <MaxWidthWrapper className="">
        <H1 className="mb-8 text-center text-4xl font-light">Checkout</H1>
        <div className="space-y-12 lg:flex lg:space-x-8">
          <div className="mt-8 w-full">{/* <CartSummary /> */}</div>
          <div className="w-full">{/* <StripeCheckoutForm /> */}</div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
