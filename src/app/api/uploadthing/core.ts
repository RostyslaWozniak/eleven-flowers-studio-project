// import { db } from "@/server/db";
// import { isAuth } from "@/server/lib/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
// import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "8MB",
      maxFileCount: 12,
    },
  })
    .middleware(async () => {
      // const user = await isAuth(req.headers);
      // if (!user) throw new Error(new UploadThingError("Unauthorized").message);

      return { admin: true };
    })

    .onUploadComplete(async ({ metadata }) => {
      console.log({ metadata });
      // const existingImage = await db.images.findFirst({
      //   where: {
      //     id: file.key,
      //   },
      // });

      // console.log({ existingImage });
      // if (existingImage == null) {
      //   const result = await db.images.create({
      //     data: {
      //       id: file.key,
      //       name: file.name,
      //       url: file.ufsUrl,
      //     },
      //   });

      //   console.log({ result });
      // }

      return { uploadedBy: "admin" };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

export type AppFileRouter = typeof ourFileRouter;
