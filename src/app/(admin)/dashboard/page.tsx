import { H1 } from "@/components/ui/typography";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  redirect("/dashboard/products");
  return (
    <div className="w-full">
      <H1>Dashboard</H1>
    </div>
  );
}
