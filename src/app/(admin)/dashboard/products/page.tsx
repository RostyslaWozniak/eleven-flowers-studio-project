import { H1 } from "@/components/ui/typography";
import { ProductForm } from "../../_components/add-edit-product-form";
import { api } from "@/trpc/server";
import { ProductsTable } from "./_components/products-table";

export default async function ProductsPage() {
  const productsData = await api.admin.products.getProducts();

  return (
    <div className="">
      <H1>Products ({productsData.productsCount})</H1>
      <div>{/* <ProductForm /> */}</div>
      <ProductsTable />
    </div>
  );
}
