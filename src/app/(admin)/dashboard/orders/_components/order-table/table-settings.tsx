"use client";

import { DialogWrapper } from "@/components/dialog-wrapper";
import { DropdownWrapper } from "@/components/dropdown-wrapper";
import IconMenu from "@/components/ui/icon-menu";
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Info, Trash2 } from "lucide-react";
import { useState } from "react";
import { DeleteOrderButton } from "./delete-order-button";
import { OrderInfo } from "./order-info";
import type { OrderAdminDTO } from "@/server/modules/admin/order-admin/order-admin.types";

type OrderTableSettingsProps = {
  order: OrderAdminDTO;
};

export const OrderTableSettings = ({ order }: OrderTableSettingsProps) => {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  return (
    <>
      <DialogWrapper
        title="Order Details"
        description=""
        isOpen={isInfoOpen}
        setIsOpen={setIsInfoOpen}
        className="flex max-h-[700px] w-[800px] flex-row-reverse justify-start gap-3"
        closeButtonVariant={{ variant: "outline", size: "md" }}
        overflowYScroll
      >
        <OrderInfo order={order} />
      </DialogWrapper>
      <DialogWrapper
        title="Delete Order"
        description="Are you sure you want to delete this order? This action cannot be undone."
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        className="flex w-[500px] flex-row-reverse justify-start gap-3"
        closeButton="Cancel"
        closeButtonVariant={{ variant: "outline", size: "md" }}
      >
        <DeleteOrderButton id={order.id} setIsDeleteOpen={setIsDeleteOpen} />
      </DialogWrapper>

      <DropdownWrapper>
        <DropdownMenuItem onClick={() => setIsInfoOpen(true)}>
          <IconMenu icon={Info} text="Info" className="text-muted-foreground" />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setIsDeleteOpen(true)}>
          <IconMenu icon={Trash2} text="Delete" className="text-destructive" />
        </DropdownMenuItem>
      </DropdownWrapper>
    </>
  );
};
