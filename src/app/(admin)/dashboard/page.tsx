import { api } from "@/trpc/server";
import { type TRPCError } from "@trpc/server";
import { ProductForm } from "../_components/add-edit-product-form";

export default async function Dashboard() {
  // try {
  //   const data = await api.admin.products.getProducts();
  //   return <div>{data}</div>;
  // } catch (err) {
  //   return <div>{(err as TRPCError).message}</div>;
  // }
  const files = await api.admin.uploadFiles.getAllImages();
  console.log(files);
  return (
    <div className="w-full">
      <ProductForm />
    </div>
  );
}
