import { db } from "@/server/db";
import { ImageAdminRepository } from "./image-admin.repository";
import type {
  DeleteImageAdminSchema,
  GetAllImagesAdminSchema,
} from "./image-admin.type";
import { TRPCError } from "@trpc/server";

export class ImageAdminService {
  public static getAll = async (input: GetAllImagesAdminSchema) => {
    return await ImageAdminRepository.findMany(input);
  };

  public static deleteMany = async (input: DeleteImageAdminSchema) => {
    const productImages = await db.productImage.findFirst({
      where: {
        url: {
          in: input,
        },
      },
    });
    if (productImages == null) {
      return await ImageAdminRepository.deleteMany(input);
    }
    throw new TRPCError({
      code: "BAD_REQUEST",
      message:
        "Some of the selected images are in use. They cannot be deleted.",
    });
  };
}
