import { db } from "@/server/db";
import { OrderAdminQueries } from "./order-admin.query";
import type { OrderAdminGetAllSchema } from "./order-admin.types";

export class OrderAdminRepository {
  public static findMany = async ({ take, skip }: OrderAdminGetAllSchema) => {
    return await db.order.findMany({
      select: OrderAdminQueries.selectFields(),
      orderBy: { createdAt: "desc" },
      take,
      skip,
    });
  };

  public static getCount = async () => {
    return await db.order.count();
  };

  public static delete = async (id: string) => {
    return await db.order.delete({ where: { id } });
  };
}
