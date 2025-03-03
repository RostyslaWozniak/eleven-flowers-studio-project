import { OrderAdminRepository } from "./order-admin.repository";

export class OrderAdminService {
  public static getAll = async () => {
    return await OrderAdminRepository.findMany();
  };

  public static delete = async (id: string) => {
    return await OrderAdminRepository.delete(id);
  };
}
