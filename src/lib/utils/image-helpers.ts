import imageCompression from "browser-image-compression";

type ImageProcessingOptions = {
  maxSizeMB: number;
  maxWidthOrHeight: number;
};

const convertToWebP = async (file: File): Promise<File> => {
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
            },
          );
          resolve(webpFile);
        },
        "image/webp",
        0.9,
      );
    };

    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = URL.createObjectURL(file);
  });
};

export const processImage = async (
  file: File,
  options: ImageProcessingOptions,
  onProgress?: (progress: number) => void,
): Promise<File> => {
  const compressionOptions = {
    maxSizeMB: options.maxSizeMB,
    maxWidthOrHeight: options.maxWidthOrHeight,
    useWebWorker: true,
    fileType: "image/webp",
    onProgress,
  };

  try {
    if (!file.type.includes("webp")) {
      return await imageCompression(
        await convertToWebP(file),
        compressionOptions,
      );
    }

    return await imageCompression(file, compressionOptions);
  } catch (error) {
    console.error("Error processing image:", error);
    throw error;
  }
};
