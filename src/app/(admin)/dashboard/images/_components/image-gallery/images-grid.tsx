"use client";

import { ImageItem } from "./image-item";

type ImagesGridProps = {
  images: { id: string; name: string; url: string }[];
  selectedImages: string[];
  setSelectedImages: React.Dispatch<React.SetStateAction<string[]>>;
};

export function ImagesGrid({
  images,
  selectedImages,
  setSelectedImages,
}: ImagesGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {images.map(({ id, name, url }) => (
        <ImageItem
          key={id}
          id={id}
          name={name}
          url={url}
          onChange={(e) =>
            setSelectedImages((prev) =>
              e.target.checked
                ? [...prev, url]
                : prev.filter((item) => item !== url),
            )
          }
          isSelected={selectedImages.includes(url)}
        />
      ))}
    </div>
  );
}
