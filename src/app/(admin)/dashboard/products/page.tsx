import { H1 } from "@/components/ui/typography";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ProductsTable } from "./_components/products-table";

export default async function ProductsPage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <H1>Products </H1>
        <Link
          href="/dashboard/products/new"
          className={cn(buttonVariants({ variant: "default", size: "md" }))}
        >
          + Add New Product
        </Link>
      </div>
      <div className="py-10">
        <ProductsTable />
      </div>
    </>
  );
}
