/* eslint-disable @next/next/no-img-element */
"use clietn";

import { Input } from "@/components/ui/input";

type ImageItemProps = {
  id: string;
  name: string;
  url: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  isSelected: boolean;
};

export function ImageItem({
  id,
  name,
  url,
  onChange,
  isSelected,
}: ImageItemProps) {
  return (
    <div key={id} className="flex flex-col items-center">
      <img
        src={url}
        alt={name}
        className="aspect-[4/5] flex-grow object-cover"
      />
      <div className="flex w-full items-center">
        <Input
          type="checkbox"
          checked={isSelected}
          onChange={onChange}
          className="h-5 w-5 cursor-pointer"
        />
        <p className="line-clamp-1 flex-grow pt-2 text-center">{name}</p>
      </div>
    </div>
  );
}
