import { db } from "@/server/db";
import { OrderAdminQueries } from "./order-admin.query";

export class OrderAdminRepository {
  public static findMany = async () => {
    return await db.order.findMany({
      select: OrderAdminQueries.selectFields(),
      orderBy: { createdAt: "desc" },
    });
  };

  public static delete = async (id: string) => {
    return await db.order.delete({ where: { id } });
  };
}
