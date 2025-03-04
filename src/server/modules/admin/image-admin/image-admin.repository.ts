import { db } from "@/server/db";
import { Prisma } from "@prisma/client";
import type { DeleteImageAdminSchema } from "./image-admin.type";
import { utapi } from "@/app/api/uploadthing/utapi";

export class ImageAdminRepository {
  public static findMany = async () => {
    return await db.images.findMany({
      select: {
        id: true,
        name: true,
        url: true,
      },
      orderBy: {
        createdAt: Prisma.SortOrder.desc,
      },
    });
  };

  public static delete = async (input: DeleteImageAdminSchema) => {
    await db.$transaction(async (tx) => {
      await tx.images.deleteMany({
        where: {
          id: {
            in: input,
          },
        },
      });

      await utapi.deleteFiles(input);
    });
  };
}
