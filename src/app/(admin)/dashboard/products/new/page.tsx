import { H1 } from "@/components/ui/typography";
import { TestForm } from "./test-form";

export default function Page() {
  return (
    <div>
      <H1 className="my-12">Add new product</H1>
      <div className="w-full border">
        <TestForm />
      </div>
    </div>
  );
}
