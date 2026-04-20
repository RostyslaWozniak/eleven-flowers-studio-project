import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { H1 } from "@/components/ui/typography";
import CartSummary from "./_components/cart-summary";

import { useTranslations } from "next-intl";
import { CheckoutForm } from "@/features/forms/checkout-form";

export default function Page() {
  const t = useTranslations("pages.cart_summary");
  return (
    <section className="pt-12">
      <MaxWidthWrapper className="px-0">
        <H1 className="mb-8 text-center text-4xl font-light">{t("title")}</H1>
        <div className="grid grid-cols-1 gap-y-8 px-2.5 md:grid-cols-2 md:py-4">
          <div className="w-full border-b pb-8 md:border-b-0 md:border-r md:pr-12">
            <CartSummary />
          </div>
          <div className="md:px-8">
            <CheckoutForm />
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
