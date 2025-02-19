import { api } from "@/trpc/server";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export async function ProductsTable() {
  const data = await api.admin.products.getProducts();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data.products} />
    </div>
  );
}
