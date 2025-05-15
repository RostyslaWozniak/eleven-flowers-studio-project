import {
  Avatar as ShadcnAvatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { cn, getInitials } from "@/lib/utils";

export function Avatar({
  photo,
  name,
  className,
}: {
  photo: string | null;
  name: string;
  className?: string;
}) {
  const initials = getInitials(name);
  return (
    <ShadcnAvatar className={cn("h-16 w-16 md:h-16 md:w-16", className)}>
      <AvatarImage src={photo ?? ""} alt={name} className="object-cover" />
      <AvatarFallback className="text-xl md:text-2xl">
        {initials}
      </AvatarFallback>
    </ShadcnAvatar>
  );
}
