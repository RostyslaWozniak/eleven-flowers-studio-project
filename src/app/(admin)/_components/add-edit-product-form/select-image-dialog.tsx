import { api } from "@/trpc/react";
import { Button, buttonVariants } from "@/components/ui/button";
import { useState } from "react";
import { DialogWrapper } from "@/components/dialog-wrapper";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { ImageItem } from "./image-item";

export const SelectImagesDialog = ({
  value,
  onChange,
  setIsOpen,
}: {
  value: string[];
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [selectedImages, setSelectedImages] = useState<string[]>(value);

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const { data: images, isLoading } =
    api.admin.uploadFiles.getAllImages.useQuery();

  if (isLoading || !images)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader className="animate-spin" size={30} />
      </div>
    );

  const closeDialog = () => {
    onChange(selectedImages);
    setIsOpen(false);
  };

  const handleSelectImageBtnClick = () => {
    closeDialog();
  };
  return (
    <div className="flex h-[500px] select-none flex-col">
      <div className="flex grow items-center py-2">
        {images.length > 0 ? (
          <div className="grid max-w-[700px] grid-cols-5">
            {images.map((image) => (
              <ImageItem
                key={image.id}
                selectedImages={selectedImages}
                setSelectedImages={setSelectedImages}
                {...image}
              />
            ))}
          </div>
        ) : (
          <p className="mx-auto">No images found</p>
        )}
      </div>

      <Button
        className="mt-4 self-end"
        size="lg"
        // disabled={!selectedImage || value === selectedImage}
        onClick={handleSelectImageBtnClick}
      >
        Select
      </Button>
      <DialogWrapper
        title="Close the dialog?"
        description="You've selected an image, but it hasn't been uploaded."
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        className="flex w-[400px] justify-end gap-3"
        closeButton="No"
        closeButtonVariant={{ variant: "destructive" }}
      >
        <Button
          onClick={() => {
            closeDialog();
            setIsDialogOpen(false);
          }}
          className={cn(buttonVariants())}
        >
          Yes
        </Button>
      </DialogWrapper>
    </div>
  );
};
