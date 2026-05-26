"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type HiddenTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  btnLabel: string;
  icon: React.ElementType;
  value: string | undefined;
};

export function HiddenTextarea({
  btnLabel,
  className,
  placeholder,
  value,
  onChange,
  icon: Icon,

  ...props
}: HiddenTextareaProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isDesctop = useMediaQuery();
  return (
    <div className="space-y-1">
      {!isOpen ? (
        <>
          <Button
            variant="outline"
            type="button"
            size="md"
            className={cn(
              "flex w-full cursor-pointer items-center justify-start rounded-full border px-3 text-sm text-muted-foreground",
              {
                "text-sm text-primary": value,
              },
            )}
            onClick={() => setIsOpen(true)}
          >
            <div className="flex flex-grow items-center gap-x-2">
              <Icon />
              {value && value.length > 0 ? value : btnLabel}
            </div>
            <ChevronDownIcon />
          </Button>
        </>
      ) : (
        <div className="flex flex-col gap-1">
          <Textarea
            autoFocus
            name="flowerMessage"
            className={cn("h-min min-h-20", className)}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            {...props}
          />

          <Button
            variant="default"
            size={isDesctop ? "sm" : "md"}
            className="md:self-end"
            onClick={() => setIsOpen(false)}
          >
            Ok
          </Button>
        </div>
      )}
    </div>
  );
}
