import { H1 } from "@/components/ui/typography";
import { api } from "@/trpc/server";
import { OrderTable } from "./_components/order-table";
import { orderColumns } from "./_components/order-table/columns";

export default async function ProductsPage() {
  const orders = await api.admin.orders.getAll();
  return (
    <div>
      <H1>Orders</H1>

      <div className="py-10">
        <OrderTable columns={orderColumns} data={orders} />
      </div>
    </div>
  );
}
