import { OrderAdminRepository } from "./order-admin.repository";
import type { OrderAdminGetAllSchema } from "./order-admin.types";

export class OrderAdminService {
  public static getAll = async (input: OrderAdminGetAllSchema) => {
    return await OrderAdminRepository.findMany(input);
  };

  public static delete = async (id: string) => {
    return await OrderAdminRepository.delete(id);
  };
}
