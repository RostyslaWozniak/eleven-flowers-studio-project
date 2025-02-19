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

type ImageSelectProps = {
  form: UseFormReturn<AddProductSchema>;
};

export function ImageSelect({ form }: ImageSelectProps) {
  const [isUploadImagesDialogOpen, setIsUploadImagesDialogOpen] =
    useState(false);
  return (
    <div>
      <FormField
        control={form.control}
        name={`images`}
        render={({ field }) => (
          <FormItem>
            <Button
              className="relative h-28 min-w-[540px] overflow-hidden rounded-md bg-transparent"
              type="button"
              onClick={() => setIsUploadImagesDialogOpen(true)}
              variant="outline"
              style={{
                backgroundImage: `url(${field.value[0]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div
                className={cn(
                  "absolute inset-0 flex items-center justify-center bg-primary/20 text-xl text-secondary-foreground",
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
                className="min-h-[500px] min-w-[700px]"
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
