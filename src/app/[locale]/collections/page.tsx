import { api } from "@/trpc/server";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const products = await api.public.products.getAllProducts({
    locale: locale,
    take: 9,
    skip: 0,
  });

  console.log({ products });
  return <div>Collections</div>;
}
