import { OrderAdminRepository } from "./order-admin.repository";
import type { OrderAdminGetAllSchema } from "./order-admin.types";

export class OrderAdminService {
  public static getAll = async (input: OrderAdminGetAllSchema) => {
    const orders = await OrderAdminRepository.findMany(input);
    const count = await OrderAdminRepository.getCount();
    return { orders, count };
  };

  public static delete = async (id: string) => {
    return await OrderAdminRepository.delete(id);
  };
}
