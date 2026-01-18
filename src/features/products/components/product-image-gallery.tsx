"use client";
import { ScrollWrapper } from "@/components/scroll-wrapper";
import { cn } from "@/lib/utils";
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
  function changeImage(index: number) {
    void setActiveImageIndex(index);
  }
  useEffect(() => {
    if (activeImageIndex < 0 || activeImageIndex >= images.length) {
      void setActiveImageIndex(images.length - 1);
    }
  }, [activeImageIndex, images.length, setActiveImageIndex]);

  return (
    <div className="isolate flex w-full flex-col space-y-4">
      <div className="relative aspect-square overflow-hidden lg:h-full">
        {images.map(({ url, alt }, i) => (
          <Image
            key={url}
            priority={i === 0}
            width={600}
            height={600}
            src={url ?? "/images/bouquet-placeholder.jpg"}
            alt={alt ?? "image of flowers"}
            className={cn(
              "absolute left-1/2 top-1/2 aspect-square w-full -translate-x-1/2 -translate-y-1/2 object-cover shadow-lg",
              {
                "z-50": i === activeImageIndex,
              },
            )}
          />
        ))}
      </div>
      {images.length > 1 && (
        <div className="px-4 md:px-0">
          <ScrollWrapper className="md:flex-wrap">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative aspect-square min-w-[100px] cursor-pointer overflow-hidden"
                onClick={() => changeImage(index)}
              >
                {index === activeImageIndex && (
                  <div className="absolute inset-0 z-20 grid place-items-center backdrop-brightness-75">
                    <Check className="size-[70%] text-background" />
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
          </ScrollWrapper>
        </div>
      )}
    </div>
  );
}
