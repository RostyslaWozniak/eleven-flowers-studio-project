import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { SortSidebar } from "./_components/sort-sidebar";

export default async function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full">
      <MaxWidthWrapper className="relative flex flex-col px-0 md:flex-row">
        <SortSidebar />
        <div className="w-full">{children}</div>
      </MaxWidthWrapper>
    </div>
  );
}
