"use client";
import { Check } from "lucide-react";
import Image from "next/image";
import { parseAsInteger, useQueryState } from "nuqs";
import { useEffect } from "react";

export function ProductImageGallery({
  images,
}: {
  images: { url: string; alt: string }[];
}) {
  const [activeImageIndex, setActiveImageIndex] = useQueryState(
    "image",
    parseAsInteger.withDefault(0),
  );
  async function changeImage(index: number) {
    await setActiveImageIndex(index);
  }
  useEffect(() => {
    if (activeImageIndex < 0 || activeImageIndex >= images.length) {
      void setActiveImageIndex(images.length - 1);
    }
  }, [activeImageIndex, images.length, setActiveImageIndex]);

  return (
    <div className="flex flex-col space-y-4 pb-8 lg:p-8">
      <div className="">
        <div className="relative aspect-square lg:h-full">
          <Image
            priority
            width={800}
            height={800}
            src={
              images[activeImageIndex]?.url ?? "/images/bouquet-placeholder.jpg"
            }
            alt={images[0]?.alt ?? "image of flowers"}
            className="aspect-square w-full bg-slate-100 object-cover shadow-lg"
          />
        </div>
      </div>
      <div className="scrollbar-hide flex h-[100px] w-screen grid-cols-3 items-start justify-start gap-x-2 overflow-x-auto px-2.5 lg:px-0">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative aspect-square h-full cursor-pointer overflow-hidden border-2 border-transparent"
            onClick={() => changeImage(index)}
          >
            {index === activeImageIndex && (
              <div className="absolute inset-0 z-20 grid place-items-center backdrop-brightness-75">
                <Check className="size-16 text-background" />
              </div>
            )}
            <Image
              priority
              width={100}
              height={100}
              src={image.url ?? "/images/bouquet-placeholder.svg"}
              alt={`${image.alt} - View ${index + 1}`}
              className="bg-slate-100 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
