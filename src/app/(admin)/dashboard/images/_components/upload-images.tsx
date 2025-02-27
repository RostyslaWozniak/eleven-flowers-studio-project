"use client";

import { generateUploadDropzone } from "@uploadthing/react";
import { type AppFileRouter } from "@/app/api/uploadthing/core";
import { toast } from "sonner";
import { api } from "@/trpc/react";
const UploadDropzone = generateUploadDropzone<AppFileRouter>();

export function UploadImages() {
  const utils = api.useUtils();
  return (
    <div className="my-12">
      <UploadDropzone
        className="flex h-[200px] border-2 py-0 outline-primary ut-button:min-h-10 ut-button:rounded-full ut-button:bg-primary ut-allowed-content:text-muted-foreground ut-label:text-primary"
        endpoint="imageUploader"
        onClientUploadComplete={() => {
          toast.success("Upload Completed");
          void utils.admin.images.getAllImages.invalidate();
        }}
        onUploadError={(error: Error) => {
          toast("Error", {
            description: error.message,
          });
        }}
        onUploadBegin={(name) => {
          // Do something once upload begins
          console.log("Uploading: ", name);
        }}
        onChange={(acceptedFiles) => {
          console.log(acceptedFiles);
        }}
      />
    </div>
  );
}
