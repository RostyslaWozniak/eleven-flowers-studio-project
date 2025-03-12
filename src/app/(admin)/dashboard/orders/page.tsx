import { H1 } from "@/components/ui/typography";
import { api } from "@/trpc/server";
import { OrderTable } from "./_components/order-table";
import { orderColumns } from "./_components/order-table/columns";
import Pagination from "@/components/pagination";

const ORDERS_PER_PAGE = 10;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
  }>;
}) {
  const { page } = await searchParams;
  const { orders, count } = await api.admin.orders.getAll({
    take: ORDERS_PER_PAGE,
    skip: (Number(page ?? 1) - 1) * ORDERS_PER_PAGE,
  });
  return (
    <div>
      <H1>Orders</H1>

      <div className="py-10">
        <OrderTable columns={orderColumns} data={orders} />
      </div>
      <Pagination totalPages={Math.ceil(count / ORDERS_PER_PAGE)} />
    </div>
  );
}
