import { ImageAdminRepository } from "./image-admin.repository";
import type { DeleteImageAdminSchema } from "./image-admin.type";

export class ImageAdminService {
  public static getAll = async () => {
    return await ImageAdminRepository.findMany();
  };

  public static delete = async (input: DeleteImageAdminSchema) => {
    return await ImageAdminRepository.delete(input);
  };
}
