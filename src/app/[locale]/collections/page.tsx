import { ContactSection } from "@/app/_components/sections";
import { CollectionsPreview } from "@/components/collections-preview";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { ProductsPreview } from "@/components/product/products-preview";
import { Separator } from "@/components/ui/separator";
import { H1 } from "@/components/ui/typography";
import { api } from "@/trpc/server";
import { getTranslations } from "next-intl/server";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { products } = await api.public.products.getAllProducts({
    take: 4,
    orderBy: "createdAt",
  });

  const t = await getTranslations({
    locale,
    namespace: "product",
  });
  return (
    <div className="bg-gradient-to-b from-card to-transparent">
      <MaxWidthWrapper className="px-0">
        <H1 className="py-12 text-center">{t("collections")}</H1>
        <CollectionsPreview />
        {/* SEPARATOR */}
        <div className="mx-auto max-w-[1400px] px-2.5 pt-12">
          <Separator />
        </div>
        <ProductsPreview
          title={t("our_newest_products")}
          products={products}
          href="/products?sort=new"
          separator
        />
      </MaxWidthWrapper>
      <ContactSection />
    </div>
  );
}
