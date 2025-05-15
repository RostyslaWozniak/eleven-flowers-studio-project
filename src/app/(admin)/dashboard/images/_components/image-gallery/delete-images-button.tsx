"use client";

import { DialogWrapper } from "@/components/dialog-wrapper";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type DeleteImagesButtonProps = {
  selectedImages: string[];
  setSelectedImages: React.Dispatch<React.SetStateAction<string[]>>;
};

export function DeleteImagesButton({
  selectedImages,
  setSelectedImages,
}: DeleteImagesButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isDeleteAvaliable, setIsDeleteAvaliable] = useState<boolean>(
    selectedImages.length > 0,
  );
  const utils = api.useUtils();
  const router = useRouter();

  const { mutate: deleteImages, isPending } =
    api.admin.images.removeImages.useMutation({
      onSuccess: () => {
        setSelectedImages([]);
        toast.success("Images deleted successfully");
        void utils.admin.images.getAllImages.invalidate();
        router.refresh();
        setIsDialogOpen(false);
      },
    });

  const handleDeleteImages = () => {
    deleteImages(selectedImages);
  };
  useEffect(() => {
    setIsDeleteAvaliable(selectedImages.length > 0);
  }, [selectedImages.length]);

  return (
    <>
      {isDeleteAvaliable ? (
        <DialogWrapper
          title="Delete Product"
          description={`Are you sure you want to delete ${selectedImages.length === 1 ? "this image" : "these images"}(${selectedImages.length})? This action cannot be undone.`}
          isOpen={isDialogOpen}
          setIsOpen={setIsDialogOpen}
          className="flex w-[500px] flex-row-reverse justify-start gap-3"
          closeButton="Cancel"
          closeButtonVariant={{ variant: "outline", size: "md" }}
        >
          <Button
            size="md"
            variant="destructive"
            onClick={handleDeleteImages}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogWrapper>
      ) : (
        <DialogWrapper
          title="Delete Images"
          description={`Please select at least one image to delete.`}
          isOpen={isDialogOpen}
          setIsOpen={setIsDialogOpen}
          className="flex w-[500px] flex-row-reverse justify-start gap-3"
          closeButton="Ok"
          closeButtonVariant={{ variant: "outline", size: "md" }}
        ></DialogWrapper>
      )}
      <Button
        className="my-4"
        size="md"
        variant="destructive"
        onClick={() => setIsDialogOpen(true)}
      >
        Delete Images ({selectedImages.length})
      </Button>
    </>
  );
}
