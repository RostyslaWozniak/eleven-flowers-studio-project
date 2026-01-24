"use client";

import LoadingButton from "@/components/loading-button";
import { deleteProductAction } from "@/features/products/actions/delete-product.action";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [isPending, startTransiton] = useTransition();

  const handleDeleteProduct = () => {
    startTransiton(async () => {
      const { error } = await deleteProductAction(id);
      if (error == null) {
        setIsDeleteOpen(false);
        toast.success("Product deleted successfully");
        router.refresh();
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
