import { db } from "@/server/db";
import type {
  DeleteImageAdminSchema,
  GetAllImagesAdminSchema,
} from "./image-admin.type";
import { utapi } from "@/app/api/uploadthing/utapi";
import { Prisma } from "@prisma/client";

export class ImageAdminRepository {
  public static findMany = async (input: GetAllImagesAdminSchema) => {
    const images = await db.images.findMany({
      select: {
        id: true,
        name: true,
        url: true,
      },

      orderBy: {
        createdAt: Prisma.SortOrder.desc,
      },
      take: input?.take,
      skip: input?.skip,
    });
    return images;
  };

  public static delete = async (imageUrl: string) => {
    await db.$transaction(async (tx) => {
      const image = await tx.images.delete({
        where: {
          url: imageUrl,
        },
      });

      await utapi.deleteFiles(image.id);
    });
  };
  public static deleteMany = async (input: DeleteImageAdminSchema) => {
    const images = await db.images.findMany({
      where: {
        url: {
          in: input,
        },
      },
    });
    const imagesIds = images.map((image) => image.id);

    await db.$transaction(async (tx) => {
      await tx.images.deleteMany({
        where: {
          id: {
            in: imagesIds,
          },
        },
      });

      await utapi.deleteFiles(imagesIds);
    });
  };
}
