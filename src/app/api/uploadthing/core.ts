import { isAuth } from "@/lib/auth";
import { db } from "@/server/db";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "8MB",
      maxFileCount: 12,
    },
  })
    .middleware(async ({ req }) => {
      const user = await isAuth(req.headers);
      if (!user) throw new Error(new UploadThingError("Unauthorized").message);
      return { admin: true };
    })
    .onUploadComplete(async ({ file }) => {
      console.log({ id: file.key, name: file.name, url: file.ufsUrl });
      const existingImage = await db.images.findFirst({
        where: {
          id: file.key,
        },
      });
      if (!existingImage) {
        await db.images.create({
          data: {
            id: file.key,
            name: file.name,
            url: file.ufsUrl,
          },
        });
      }

      return { uploadedBy: "admin" };
    }),
} satisfies FileRouter;
export type OurFileRouter = typeof ourFileRouter;

export type AppFileRouter = typeof ourFileRouter;
