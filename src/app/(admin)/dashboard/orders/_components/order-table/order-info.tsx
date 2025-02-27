import { Badge } from "@/components/ui/badge";
import { type AdminOrderDto } from "@/server/api/routers/admin/types/order-types";
import {
  CalendarIcon,
  ClipboardList,
  CreditCard,
  Package,
  ShoppingBag,
  User,
} from "lucide-react";
import { format } from "date-fns";
import { formatPrice } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { env } from "@/env";

type OrderInfoProps = {
  order: AdminOrderDto;
};

export function OrderInfo({ order }: OrderInfoProps) {
  const isStripeTest = env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.includes("test");
  return (
    <div className="mb-4 flex w-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm font-medium">
              Created on {format(order.createdAt, "PPP")}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm font-medium">
              Total Price: {formatPrice(order.totalPrice)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
            Payment ID:
            <Link
              className="hover:underline"
              href={`https://dashboard.stripe.com/${isStripeTest ? "test" : ""}/payments/${order.paymentIntentId}`}
              target="_blank"
            >
              {order.paymentIntentId}
            </Link>
          </div>
        </div>
        <Badge
          variant={
            order.paymentStatus === "SUCCESS"
              ? "success"
              : order.paymentStatus === "PENDING"
                ? "warning"
                : "destructive"
          }
        >
          {order.paymentStatus}
        </Badge>
      </div>

      <div className="grid gap-2 rounded-sm bg-card/80">
        <ScrollArea className="max-h-[250px] p-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm font-medium">Order Items</p>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Quantity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.orderItems.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell>{item.size}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2 rounded-sm bg-card/80 p-2">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm font-medium">Ordering Party Details</p>
          </div>
          <p className="text-sm">{order.deliveryDetails?.name}</p>
          <p className="text-sm">{order.deliveryDetails?.phone}</p>
          {order.deliveryDetails && (
            <p className="text-sm">
              Date: {format(order.deliveryDetails.deliveryDate, "PPP")}
            </p>
          )}
          <p className="text-sm">Time: {order.deliveryDetails?.deliveryTime}</p>
        </div>

        {order.contactInfo && (
          <div className="space-y-1 rounded-sm bg-card/80 p-2">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium">Contact Information</p>
            </div>
            <p className="text-sm">{order.contactInfo.name}</p>
            <p className="text-sm">{order.contactInfo.email}</p>
            <p className="text-sm">{order.contactInfo.phone}</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-x-2 rounded-sm bg-card/80">
        <div className="space-y-2 p-2">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm font-medium">Delivery Details</p>
          </div>
          <p className="text-sm">{order.address?.street}</p>
          <p className="text-sm">
            {order.address?.city}, {order.address?.postCode}
          </p>
          {order.deliveryDetails && (
            <p className="text-sm">
              Date: {format(order.deliveryDetails.deliveryDate, "PPP")}
            </p>
          )}
          <p className="text-sm">Time: {order.deliveryDetails?.deliveryTime}</p>
        </div>
        {order.deliveryDetails && (
          <div className="p-2">
            <p className="text-sm font-medium">Delivery Instructions:</p>
            <p className="text-sm">{order.deliveryDetails.description}</p>
          </div>
        )}
        {order.deliveryDetails && (
          <div className="p-2">
            <p className="text-sm font-medium">Flower message:</p>
            <p className="text-sm">{order.deliveryDetails.flowerMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}
