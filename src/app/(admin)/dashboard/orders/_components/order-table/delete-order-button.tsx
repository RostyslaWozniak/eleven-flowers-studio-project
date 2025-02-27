"use client";

import LoadingButton from "@/components/loading-button";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type DeleteOrderButtonProps = {
  id: string;
  setIsDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function DeleteOrderButton({
  id,
  setIsDeleteOpen,
}: DeleteOrderButtonProps) {
  const router = useRouter();
  const { mutate: deleteOrder, isPending: isDeleting } =
    api.admin.orders.delete.useMutation({
      onSuccess: () => {
        setIsDeleteOpen(false);
        toast.success("Order deleted successfully");
        router.refresh();
      },
      onError: () => {
        setIsDeleteOpen(false);
        toast.error("Order deletion failed");
      },
    });

  const handleDeleteOrder = () => {
    deleteOrder({ id });
  };
  return (
    <LoadingButton
      size="md"
      variant="destructive"
      className="self-end"
      onClick={handleDeleteOrder}
      loading={isDeleting}
    >
      Delete
    </LoadingButton>
  );
}
