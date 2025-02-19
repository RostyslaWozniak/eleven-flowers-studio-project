/**
 * A reusable wrapper component for the Radix UI DropdownMenu component.
 *
 * @param {React.ReactNode} children - The content to be rendered within the DropdownMenu.
 * Each child should be wrapped in a DropdownMenuItem component.
 * @param {string} [className] - The class name to be applied to the DropdownMenuContent element.
 * @param {"start" | "center" | "end"} [align] - The alignment of the dropdown menu.
 * @return {JSX.Element} The DropdownMenu component with the provided children.
 * @example
 * <DropdownWrapper>
 *   <DropdownMenuItem>Item 1</DropdownMenuItem>
 *   <DropdownMenuItem>Item 2</DropdownMenuItem>
 *   <DropdownMenuItem>Item 3</DropdownMenuItem>
 * </DropdownWrapper>
 */

import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, MoreVertical } from "lucide-react";
import {
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";

type DropdownWrapperProps = {
  children: React.ReactNode;
  className?: string;
  align?: "start" | "center" | "end";
  vertical?: boolean;
  label?: string;
};

export const DropdownWrapper = ({
  children,
  className,
  align = "end",
  label,
  vertical = false,
}: DropdownWrapperProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="grid h-8 w-8 place-items-center opacity-70 outline-none hover:opacity-100">
        {vertical ? (
          <MoreVertical className="h-5 w-5" />
        ) : (
          <MoreHorizontal className="h-5 w-5" />
        )}
        <span className="sr-only">Open menu</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={align}
        className={cn("z-50 w-[120px]", className)}
      >
        {label && <DropdownMenuLabel>{label}</DropdownMenuLabel>}
        <DropdownMenuSeparator />
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
