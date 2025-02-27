/* eslint-disable @next/next/no-img-element */
"use client";

import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import { Loader } from "lucide-react";
import { ImageItem } from "./image-item";

export const SelectImagesDialog = ({
  value,
  onChange,
  setIsOpen,
}: {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [selectedImage, setSelectedImage] = useState<string>(value);

  const { data: images, isLoading } = api.admin.images.getAllImages.useQuery();

  if (isLoading || !images)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader className="animate-spin" size={30} />
      </div>
    );

  const closeDialog = () => {
    onChange(selectedImage);
    setIsOpen(false);
  };

  const handleSelectImageBtnClick = () => {
    closeDialog();
  };
  return (
    <div className="flex h-[500px] select-none flex-col">
      <div className="flex-grow items-center py-2">
        {images.length > 0 ? (
          <div className="grid max-w-[700px] grid-cols-5">
            {images.map((image) => (
              <ImageItem
                key={image.id}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                {...image}
              />
            ))}
          </div>
        ) : (
          <p className="mx-auto">No images found</p>
        )}
      </div>
      <div className="sticky -bottom-6 flex items-center justify-between bg-white/40 backdrop-blur">
        <div className="scrollbar-hide flex flex-grow gap-2 overflow-x-auto py-2">
          {selectedImage.length > 0 && (
            <img
              className="aspect-square object-cover"
              src={selectedImage}
              width={100}
              height={100}
              alt="image"
            />
          )}
        </div>
        <Button
          className="my-4 self-end"
          size="md"
          onClick={handleSelectImageBtnClick}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};
