import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { SortSidebar } from "./_components/sort-sidebar";
import { validateLang } from "@/lib/utils";
import { setRequestLocale } from "next-intl/server";

export default async function ProductsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const paramsData = await params;

  const { locale } = paramsData;

  const lang = validateLang(locale);

  setRequestLocale(lang);
  return (
    <div className="relative w-full">
      <MaxWidthWrapper className="relative flex flex-col px-0 md:flex-row">
        <SortSidebar />
        <div className="w-full">{children}</div>
      </MaxWidthWrapper>
    </div>
  );
}
