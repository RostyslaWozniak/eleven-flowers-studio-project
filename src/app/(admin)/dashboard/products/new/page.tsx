import { H1 } from "@/components/ui/typography";
import { ProductForm } from "@/app/(admin)/dashboard/products/_components/add-edit-product-form";

export default function Page() {
  return (
    <div>
      <H1>Add new product</H1>
      <div className="w-full pt-12">
        <ProductForm />
      </div>
    </div>
  );
}
