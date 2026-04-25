/* eslint-disable @next/next/no-img-element */
"use client";

import { DialogWrapper } from "@/components/dialog-wrapper";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { type AddProductSchema } from "@/lib/validation/product";
import { ImageIcon } from "lucide-react";
import { useState } from "react";
import { type UseFormReturn } from "react-hook-form";
import { SelectImagesDialog } from "./select-image-dialog";

const MAX_IMAGES_TO_SHOW = 4;

type ImageSelectProps = {
  form: UseFormReturn<AddProductSchema>;
};

export function ImageSelect({ form }: ImageSelectProps) {
  const [isUploadImagesDialogOpen, setIsUploadImagesDialogOpen] =
    useState(false);

  const selectedImages = form.watch("images");
  const selectedImagesLength = selectedImages.length;
  return (
    <div className="w-min space-y-3">
      <FormField
        control={form.control}
        name={`images`}
        render={({ field }) => (
          <FormItem>
            <Button
              className="relative overflow-hidden rounded-md bg-transparent"
              type="button"
              onClick={() => setIsUploadImagesDialogOpen(true)}
              variant="outline"
            >
              <div
                className={cn(
                  "flex items-center justify-center text-nowrap text-xl",
                  {},
                )}
              >
                {field.value.length > 0 ? "Change image" : "Select image"}
                <ImageIcon className="ml-3 h-8 w-8" />
              </div>
            </Button>
            <FormControl className="">
              <DialogWrapper
                title="Uploaded images"
                description="Select from existing images or upload a new one."
                isOpen={isUploadImagesDialogOpen}
                setIsOpen={setIsUploadImagesDialogOpen}
                className="h-[500px] min-w-[700px]"
                overflowYScroll
              >
                <SelectImagesDialog
                  onChange={field.onChange}
                  value={field.value}
                  setIsOpen={setIsUploadImagesDialogOpen}
                />
              </DialogWrapper>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div>Selected {selectedImagesLength} images</div>
      <div className="flex h-20 items-center gap-x-2">
        {selectedImages.slice(0, MAX_IMAGES_TO_SHOW).map((img) => (
          <img
            src={img}
            key={img}
            alt="selected image"
            className="aspect-square h-20 w-20 object-cover"
          />
        ))}
        {selectedImagesLength > MAX_IMAGES_TO_SHOW && (
          <p className="self-end text-nowrap"> And more...</p>
        )}
      </div>
    </div>
  );
}
