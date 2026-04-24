import { ProductsTable } from "./_components/products-table";
import { DeviceNotSuported } from "@/components/device-not-suported";

export default async function ProductsPage() {
  return (
    <>
      <ProductsTable />
      <DeviceNotSuported />
    </>
  );
}
