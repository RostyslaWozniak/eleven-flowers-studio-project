"use client";

import { CardSkeleton } from "@/components/skeletons/card-skeleton";
import { api } from "@/trpc/react";
import { useState } from "react";
import { ImagesGrid } from "./images-grid";
import { DeleteImagesButton } from "./delete-images-button";

export function ImageGallery() {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const { data: images, isLoading } = api.admin.images.getAllImages.useQuery();

  if (!images && !isLoading) return <p>No images found</p>;
  return (
    <>
      <div className="sticky right-0 top-0 flex items-center justify-end">
        <DeleteImagesButton
          selectedImages={selectedImages}
          setSelectedImages={setSelectedImages}
        />
      </div>
      {!isLoading ? (
        images && images.length > 0 ? (
          <div>
            <ImagesGrid
              images={images}
              selectedImages={selectedImages}
              setSelectedImages={setSelectedImages}
            />
          </div>
        ) : (
          <div className="flex min-h-[200px] items-center justify-center">
            <p>No images found</p>
          </div>
        )
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <CardSkeleton key={index} className="aspect-[4/5]" />
          ))}
        </div>
      )}
    </>
  );
}
