"use client";
import { Check } from "lucide-react";
import Image from "next/image";
import { useQueryState } from "nuqs";

export function ProductImageGallery({
  images,
}: {
  images: { url: string; alt: string }[];
}) {
  const [activeImageUrl, setActiveImageUrl] = useQueryState("image", {
    defaultValue: images[0]?.url ?? "/images/bouquet-placeholder.jpg",
  });
  return (
    <div className="flex flex-col space-y-4 py-8 xl:p-12">
      <div className="relative aspect-square lg:h-full">
        <Image
          fill
          priority
          sizes={"(max-width: 768px) 100vw, (max-width: 1200px) 500px"}
          src={activeImageUrl}
          alt={images[0]?.alt ?? "image of flowers"}
          className="aspect-square w-full object-cover shadow-lg"
        />
      </div>
      <div className="flex h-[100px] w-full grid-cols-3 items-start justify-start gap-x-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative aspect-square h-full cursor-pointer border-2 border-transparent"
            onClick={() => setActiveImageUrl(image.url)}
          >
            {image.url === activeImageUrl && (
              <div className="absolute inset-0 z-20 grid place-items-center backdrop-brightness-75">
                <Check className="size-16 text-background" />
              </div>
            )}
            <Image
              fill
              priority
              sizes={"(max-width: 768px) 200px, (max-width: 1200px) 100px"}
              src={image.url ?? "/images/bouquet-placeholder.svg"}
              alt={`${image.alt} - View ${index + 1}`}
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
