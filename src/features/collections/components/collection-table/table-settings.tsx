"use client";

import { DialogWrapper } from "@/components/dialog-wrapper";
import { DropdownWrapper } from "@/components/dropdown-wrapper";
import IconMenu from "@/components/ui/icon-menu";
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { DeleteCollectionButton } from "./delete-collection-button";
import { CollectionForm } from "../add-edit-collection-form";
import type { CollectionAdminDTO } from "../../types/collection.types";

type ProductTableSettingsProps = {
  collection: CollectionAdminDTO;
};

export const CollectionTableSettings = ({
  collection,
}: ProductTableSettingsProps) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  return (
    <>
      <DialogWrapper
        title="Edit Product"
        description="Make changes to your product here. Do not forget to save changes."
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        className="flex max-h-[90vh] w-[1000px] justify-end gap-3"
      >
        <CollectionForm collection={collection} setIsEditOpen={setIsEditOpen} />
      </DialogWrapper>
      <DialogWrapper
        title="Delete Product"
        description="Are you sure you want to delete this product? This action cannot be undone."
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        className="flex w-[500px] flex-row-reverse justify-start gap-3"
        closeButton="Cancel"
        closeButtonVariant={{ variant: "outline", size: "md" }}
      >
        <DeleteCollectionButton
          id={collection.id}
          setIsDeleteOpen={setIsDeleteOpen}
        />
      </DialogWrapper>

      <DropdownWrapper>
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
