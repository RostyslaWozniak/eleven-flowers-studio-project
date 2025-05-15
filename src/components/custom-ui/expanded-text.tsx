"use client";

import { cn } from "@/lib/utils";
import { Text } from "../ui/typography";
import { useEffect, useRef, useState } from "react";

export function ExpandedText({
  children,
  lines = 4,
}: {
  children: string;
  lines: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const [isLonger, setIsLonger] = useState(false);

  const ref = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if ((ref?.current?.offsetHeight ?? 109) > 110) {
      console.log(ref?.current?.offsetHeight);
      setIsLonger(true);
    }
  }, []);
  return (
    <>
      <Text
        ref={ref}
        className={cn({
          [`line-clamp-${lines}`]: isLonger,
          "line-clamp-none": expanded,
        })}
      >
        {children}
      </Text>
      {isLonger && (
        <div
          onClick={() => setExpanded((prev) => !prev)}
          className="relative float-right w-min -translate-y-2 cursor-pointer text-nowrap text-end text-xs italic text-primary hover:underline"
        >
          {expanded ? "Show less" : "Show more"}
          <span className="absolute -inset-3" />
        </div>
      )}
    </>
  );
}
