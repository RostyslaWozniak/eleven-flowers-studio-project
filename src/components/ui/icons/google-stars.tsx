import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

export function GoogleStars({
  className,
  starsNum = 5,
  size = 32,
}: {
  className?: string;
  starsNum?: number;
  size?: number;
}) {
  return (
    <div className={cn("flex items-center", className)}>
      {Array.from({ length: starsNum }).map((_, i) => (
        <Star
          key={i}
          size={size}
          strokeWidth={0}
          fill="FDD663"
          className="fill-[#FDD663]"
        />
      ))}
    </div>
  );
}
