import { db } from "@/server/db";
import { OrderInfo } from "../_components/order-table/order-info";
import { notFound } from "next/navigation";
import { OrderAdminQueries } from "@/server/modules/admin/order-admin/order-admin.query";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

export default async function OrderPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  const order = await db.order.findUnique({
    select: OrderAdminQueries.selectFields(),
    where: {
      id: orderId,
    },
  });
  if (order == null) return notFound();
  return (
    <div className="max-w-5xl">
      <Link
        href="/dashboard/orders"
        className={cn(buttonVariants({ variant: "outline" }), "mb-6")}
      >
        <ArrowLeftIcon />
        Go to orders
      </Link>
      <div className="relative">
        <OrderInfo order={order} />
      </div>
    </div>
  );
}
