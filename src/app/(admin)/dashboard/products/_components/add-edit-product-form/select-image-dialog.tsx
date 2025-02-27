/* eslint-disable @next/next/no-img-element */
"use client";

import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import { Loader, X } from "lucide-react";
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

  const { data: images, isLoading } = api.admin.images.getAllImages.useQuery();

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
      <div className="flex-grow items-center py-2">
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
      <div className="sticky -bottom-6 flex items-center justify-between bg-white/40 backdrop-blur">
        <div className="scrollbar-hide flex flex-grow gap-2 overflow-x-auto py-2">
          {selectedImages.map((image) => (
            <div key={image} className="relative">
              <Button
                className="absolute -right-2 -top-2 opacity-60 hover:opacity-100"
                size="icon"
                variant="destructive"
                onClick={() => {
                  setSelectedImages(
                    selectedImages.filter((img) => img !== image),
                  );
                }}
              >
                <X />
              </Button>

              <img
                className="aspect-square object-cover"
                src={image}
                width={100}
                height={100}
                alt="image"
              />
            </div>
          ))}
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
