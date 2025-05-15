import { ImageAdminRepository } from "./image-admin.repository";
import type {
  DeleteImageAdminSchema,
  GetAllImagesAdminSchema,
} from "./image-admin.type";

export class ImageAdminService {
  public static getAll = async (input: GetAllImagesAdminSchema) => {
    return await ImageAdminRepository.findMany(input);
  };

  public static delete = async (input: DeleteImageAdminSchema) => {
    return await ImageAdminRepository.delete(input);
  };
}
