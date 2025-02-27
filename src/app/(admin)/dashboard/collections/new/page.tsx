import { H1 } from "@/components/ui/typography";
import { CollectionForm } from "../_components/add-edit-collection-form";

export default function Page() {
  return (
    <div>
      <H1>Add new collection</H1>
      <div className="w-full pt-12">
        <CollectionForm />
      </div>
    </div>
  );
}
