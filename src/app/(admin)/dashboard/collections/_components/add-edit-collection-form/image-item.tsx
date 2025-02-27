/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export const ImageItem = ({
  name,
  url,
  selectedImage,
  setSelectedImage,
}: {
  name: string;
  url: string;
  selectedImage: string;
  setSelectedImage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div
      className={cn("relative flex flex-col outline-primary")}
      onClick={() => setSelectedImage(url)}
      onKeyDown={(e) => e.key === "Enter" && setSelectedImage(url)}
    >
      <img
        src={url}
        width={100}
        height={100}
        alt="image"
        className={cn("aspect-square cursor-pointer self-center object-cover")}
      />
      {selectedImage === url && (
        <span className="absolute bottom-8 left-5 right-5 top-0 flex cursor-pointer items-center justify-center bg-emerald-500/30 text-card">
          <Check size={50} />
        </span>
      )}
      <p className="h-8 overflow-hidden text-pretty text-center text-xs leading-tight">
        {name.split(".")[0]}
      </p>
    </div>
  );
};
