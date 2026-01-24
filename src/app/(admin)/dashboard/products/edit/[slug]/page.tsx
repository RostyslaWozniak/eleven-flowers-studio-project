import { H1 } from "@/components/ui/typography";
import { ProductForm } from "@/app/(admin)/dashboard/products/_components/add-edit-product-form";
import { api } from "@/trpc/server";
import { Suspense } from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div>
      <H1>Edit product</H1>
      <div className="w-full pt-12">
        <Suspense fallback={<div>Loading...</div>}>
          <SuspenseEditProductForm slug={slug} />
        </Suspense>
      </div>
    </div>
  );
}

async function SuspenseEditProductForm({ slug }: { slug: string }) {
  const product = await api.admin.products.getOneBySlug({ slug });
  return <ProductForm product={product} />;
}
