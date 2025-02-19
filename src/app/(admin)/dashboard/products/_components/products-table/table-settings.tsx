"use client";

import { DialogWrapper } from "@/components/dialog-wrapper";
import { DropdownWrapper } from "@/components/dropdown-wrapper";
import IconMenu from "@/components/ui/icon-menu";
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { InfoIcon, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { ProductForm } from "../../../../_components/add-edit-product-form";
import { type AdminProductDto } from "@/server/api/routers/admin/types/product-types";

type ProductTableSettingsProps = {
  product: AdminProductDto;
};

export const ProductTableSettings = ({
  product,
}: ProductTableSettingsProps) => {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  return (
    <>
      <DialogWrapper
        title="Info About Product"
        description="Here you can find more information about the product."
        isOpen={isInfoOpen}
        setIsOpen={setIsInfoOpen}
        className="flex max-h-[90vh] w-[800px] flex-col gap-3"
        closeButton="Ok"
      >
        INFO
        {/* <InfoCard
          product={product}
          warningStockLevel={warningStockLevel}
          lowStockAlertLevel={lowStockAlertLevel}
          hideImageOnMobile
        /> */}
      </DialogWrapper>
      <DialogWrapper
        title="Edit Product"
        description="Make changes to your product here. Do not forget to save changes."
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        className="flex max-h-[90vh] w-[1000px] justify-end gap-3"
      >
        <ProductForm product={product} />
      </DialogWrapper>
      <DialogWrapper
        title="Delete Product"
        description="Are you sure you want to delete this product? This action cannot be undone."
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        className="flex w-[500px] flex-row-reverse justify-start gap-3"
        closeButton="Cancel"
        closeButtonVariant={{ variant: "outline", size: "lg" }}
      >
        {/* <DeleteProductButton
          id={product.id}
          setIsDeleteOpen={setIsDeleteOpen}
        /> */}
        DELETE BUTTON
      </DialogWrapper>

      <DropdownWrapper>
        <DropdownMenuItem onClick={() => setIsInfoOpen(true)}>
          <IconMenu
            icon={InfoIcon}
            text="Info"
            className="text-muted-foreground"
          />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
          <IconMenu icon={Edit} text="Edit" />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setIsDeleteOpen(true)}>
          <IconMenu icon={Trash2} text="Delete" className="text-destructive" />
        </DropdownMenuItem>
      </DropdownWrapper>
    </>
  );
};
