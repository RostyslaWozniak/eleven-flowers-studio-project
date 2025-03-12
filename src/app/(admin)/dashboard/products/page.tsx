import { H1 } from "@/components/ui/typography";
import { api } from "@/trpc/server";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ProductsTable } from "./_components/products-table";
import { columns } from "./_components/products-table/columns";
import Pagination from "@/components/pagination";

const PRODUCTS_PER_PAGE = 10;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
  }>;
}) {
  const { page } = await searchParams;
  const { products, productsCount } = await api.admin.products.getAll({
    take: PRODUCTS_PER_PAGE,
    skip: (Number(page ?? 1) - 1) * PRODUCTS_PER_PAGE,
  });

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <H1>Products ({productsCount})</H1>
        <Link
          href="/dashboard/products/new"
          className={cn(buttonVariants({ variant: "default", size: "md" }))}
        >
          + Add New Product
        </Link>
      </div>
      <div className="py-10">
        <ProductsTable columns={columns} data={products} />
      </div>
      <div>
        <Pagination totalPages={Math.ceil(productsCount / PRODUCTS_PER_PAGE)} />
      </div>
    </div>
  );
}
