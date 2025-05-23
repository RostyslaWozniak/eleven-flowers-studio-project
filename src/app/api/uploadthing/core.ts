import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "8MB",
      maxFileCount: 12,
    },
  })
    .middleware(async () => {
      return {};
    })

    .onUploadComplete(async () => {
      return { uploadedBy: "admin" };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

export type AppFileRouter = typeof ourFileRouter;
