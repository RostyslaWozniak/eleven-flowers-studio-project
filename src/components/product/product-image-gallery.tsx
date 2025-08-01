"use client";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import Image from "next/image";
import { parseAsInteger, useQueryState } from "nuqs";
import { useEffect, Fragment } from "react";

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
    <div className="isolate flex flex-col space-y-4 pb-8 lg:p-8">
      <div className="">
        <div className="relative aspect-square overflow-hidden lg:h-full">
          {images.map(({ url, alt }, i) => (
            <Fragment key={url}>
              <Image
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
              <div className="absolute inset-0 animate-pulse bg-slate-100" />
            </Fragment>
          ))}
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
