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
import { ImageIcon } from "lucide-react";
import { useState } from "react";
import { type UseFormReturn } from "react-hook-form";
import { SelectImagesDialog } from "./select-image-dialog";
import type { CreateCollectionSchema } from "../../types/collection.types";

type ImageSelectProps = {
  form: UseFormReturn<CreateCollectionSchema>;
};

export function ImageSelect({ form }: ImageSelectProps) {
  const [isUploadImagesDialogOpen, setIsUploadImagesDialogOpen] =
    useState(false);
  return (
    <div className="w-min">
      <FormField
        control={form.control}
        name={`imageUrl`}
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
                  "flex items-center justify-center text-nowrap text-xl text-secondary-foreground",
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
                <div className="h-[400px]">
                  <SelectImagesDialog
                    onChange={field.onChange}
                    value={field.value}
                    setIsOpen={setIsUploadImagesDialogOpen}
                  />
                </div>
              </DialogWrapper>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
