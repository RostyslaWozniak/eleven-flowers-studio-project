import { isAuth } from "@/lib/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
// import sharp from "sharp";
// import * as fs from "fs";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: "4MB",
      maxFileCount: 3,
    },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      const user = await isAuth(req.headers);
      if (!user) throw new Error(new UploadThingError("Unauthorized").message);
      return { admin: true };
    })
    .onUploadComplete(async () => {
      return { uploadedBy: "admin" };
    }),
} satisfies FileRouter;
export type OurFileRouter = typeof ourFileRouter;

export type AppFileRouter = typeof ourFileRouter;
