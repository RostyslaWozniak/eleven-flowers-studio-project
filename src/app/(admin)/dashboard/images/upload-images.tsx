"use client";

import { generateUploadDropzone } from "@uploadthing/react";
import { type AppFileRouter } from "@/app/api/uploadthing/core";
import { toast } from "sonner";
const UploadDropzone = generateUploadDropzone<AppFileRouter>();

export function UploadImages() {
  return (
    <div className="my-12">
      <UploadDropzone
        className="ut-button:bg-primary ut-allowed-content:text-muted-foreground ut-label:text-primary flex h-[200px] border-2 py-0 outline-primary"
        endpoint="imageUploader"
        onClientUploadComplete={() => {
          toast("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          toast("Error", {
            description: error.message,
            className: "bg-destructive text-destructive-foreground",
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
