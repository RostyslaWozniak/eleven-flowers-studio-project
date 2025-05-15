import imageCompression from "browser-image-compression";

interface ImageProcessingOptions {
  maxSizeMB: number;
  maxWidthOrHeight: number;
  convertToWebP: boolean;
}

export const convertToWebP = async (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }

      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Could not convert to WebP"));
            return;
          }

          const webpFile = new File(
            [blob],
            file.name.replace(/\.[^/.]+$/, ".webp"),
            {
              type: "image/webp",
            }
          );
          resolve(webpFile);
        },
        "image/webp",
        0.9
      );
    };

    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = URL.createObjectURL(file);
  });
};

export const processImage = async (
  file: File,
  options: ImageProcessingOptions,
  onProgress?: (progress: number) => void
): Promise<File> => {
  const compressionOptions = {
    maxSizeMB: options.maxSizeMB,
    maxWidthOrHeight: options.maxWidthOrHeight,
    useWebWorker: true,
    onProgress,
  };

  try {
    let processedFile = await imageCompression(file, compressionOptions);

    if (options.convertToWebP && !file.type.includes("webp")) {
      processedFile = await convertToWebP(processedFile);
    }

    return processedFile;
  } catch (error) {
    console.error("Error processing image:", error);
    throw error;
  }
};
