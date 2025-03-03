import { db } from "@/server/db";
import { Prisma } from "@prisma/client";
import type { DeleteImageAdminSchema } from "./image-admin.type";

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
    return await db.images.deleteMany({
      where: {
        id: {
          in: input,
        },
      },
    });
  };
}
