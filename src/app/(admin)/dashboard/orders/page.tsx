import { H1 } from "@/components/ui/typography";
import { OrderTable } from "./_components/order-table";

export default async function ProductsPage() {
  return (
    <div>
      <H1>Orders</H1>

      <div className="py-10">
        <OrderTable />
      </div>
    </div>
  );
}
