"use client";

import { Button } from "@/components/ui/button";
import { deleteCollectionAction } from "@/features/collections/actions/delete-collection.action";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
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
  const [isPending, startTransition] = useTransition();

  const handleDeleteCollection = () => {
    startTransition(async () => {
      await deleteCollectionAction(id);
      startTransition(() => {
        setIsDeleteOpen(false);
        toast.success("Collection deleted successfully");
        router.refresh();
      });
    });
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
