import { H1 } from "@/components/ui/typography";
import { ProductForm } from "../../_components/add-edit-product-form";

export default function ProductsPage() {
  return (
    <div>
      <H1>Products</H1>
      <div>
        <ProductForm />
      </div>
    </div>
  );
}
