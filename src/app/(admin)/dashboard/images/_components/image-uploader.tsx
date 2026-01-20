"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useUploadThing } from "@/lib/utils/uploadthing";
import { processImage } from "@/lib/utils/image-helpers";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { toast } from "sonner";

type ImageUploaderProps = {
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
};

export function ImageUploader({
  maxSizeMB = 1,
  maxWidthOrHeight = 1024,
}: ImageUploaderProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const router = useRouter();
  const utils = api.useUtils();

  const { mutate: createImages } = api.admin.images.createMany.useMutation({
    onSuccess: () => {
      router.refresh();
      void utils.admin.images.getAllImages.invalidate();
    },
    onError: () => {
      toast.error("Something went wrong. Try again!");
    },
  });

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      if (res) {
        createImages({
          images: res.map((file) => ({
            id: file.key,
            name: file.name,
            url: file.ufsUrl,
          })),
        });
      }
      setProgress(0);
      setIsProcessing(false);
    },
    onUploadProgress: (progress) => {
      setProgress(progress);
    },
    onUploadError: (error: Error) => {
      alert("Upload failed: " + error.message);
      setProgress(0);
      setIsProcessing(false);
    },
  });

  const onDrop = (acceptedFiles: File[]) => {
    void (async () => {
      if (acceptedFiles.length > 12) {
        alert("You can only upload up to 12 images at a time.");
        return;
      }

      try {
        setIsProcessing(true);
        const processedFiles = await Promise.all(
          acceptedFiles.map((file) =>
            processImage(file, { maxSizeMB, maxWidthOrHeight }, setProgress),
          ),
        );

        await startUpload(processedFiles);
      } catch {
        alert("Error processing images. Please try again.");
        setIsProcessing(false);
        setProgress(0);
      }
    })();
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    multiple: true,
  });

  return (
    <div className="mx-auto w-full py-4 sm:p-4">
      <div
        {...getRootProps()}
        className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
      >
        <input {...getInputProps()} />
        {isProcessing ? (
          <div className="space-y-2">
            <div className="text-gray-500">
              {progress < 100 ? "Processing images..." : "Uploading..."}
            </div>
            <div className="h-2.5 w-full rounded-full bg-gray-200">
              <div
                className="h-2.5 rounded-full bg-blue-600 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="text-4xl text-gray-400">📸</div>
            <p className="text-gray-600">
              {isDragActive
                ? "Drop the images here"
                : "Drag and drop images, or click to select"}
            </p>
            <p className="text-sm text-gray-400">
              Supports: JPG, PNG, GIF, WEBP
            </p>
            <p className="text-xs text-gray-400">
              Images will be automatically resized to {maxWidthOrHeight}px,
              compressed to max {maxSizeMB}MB
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
