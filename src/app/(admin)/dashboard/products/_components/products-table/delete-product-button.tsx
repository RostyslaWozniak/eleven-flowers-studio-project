"use client";

import LoadingButton from "@/components/loading-button";
import { deleteProductAction } from "@/features/products/actions/delete-product.action";
import { api } from "@/trpc/react";
import { useTransition } from "react";
import { toast } from "sonner";

type DeleteProductButtonProps = {
  id: string;
  setIsDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function DeleteProductButton({
  id,
  setIsDeleteOpen,
}: DeleteProductButtonProps) {
  const utils = api.useUtils();
  const [isPending, startTransiton] = useTransition();

  const handleDeleteProduct = () => {
    startTransiton(async () => {
      const { error } = await deleteProductAction(id);
      if (error == null) {
        setIsDeleteOpen(false);
        toast.success("Product deleted successfully");
        void utils.admin.products.getAll.invalidate();
        return;
      }
      setIsDeleteOpen(false);
      toast.error("Product deletion failed");
    });
  };
  return (
    <LoadingButton
      size="md"
      variant="destructive"
      className="self-end"
      onClick={handleDeleteProduct}
      loading={isPending}
    >
      Delete
    </LoadingButton>
  );
}
