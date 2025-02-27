"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type DeleteCollectionButtonProps = {
  id: string;
  setIsDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function DeleteCollectionButton({
  id,
  setIsDeleteOpen,
}: DeleteCollectionButtonProps) {
  const router = useRouter();
  const { mutate: deleteCollection, isPending } =
    api.admin.collections.delete.useMutation({
      onSuccess: () => {
        setIsDeleteOpen(false);
        toast.success("Collection deleted successfully");
        router.refresh();
      },
      onError: () => {
        setIsDeleteOpen(false);
        toast.error("Collection deletion failed");
      },
    });

  const handleDeleteCollection = () => {
    deleteCollection({ id });
  };
  return (
    <Button
      size="md"
      variant="destructive"
      onClick={handleDeleteCollection}
      disabled={isPending}
    >
      {isPending ? "Deleting..." : "Delete"}
    </Button>
  );
}
