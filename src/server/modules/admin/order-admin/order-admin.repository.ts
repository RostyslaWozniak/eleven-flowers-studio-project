import { db } from "@/server/db";
import { OrderAdminQueries } from "./order-admin.query";
import type { OrderAdminGetAllSchema } from "./order-admin.types";
import { subDays } from "date-fns/subDays";

export class OrderAdminRepository {
  public static findMany = async ({ take, skip }: OrderAdminGetAllSchema) => {
    const today = new Date();
    const yesterday = subDays(today, 1);

    return await db.order.findMany({
      select: OrderAdminQueries.selectFields(),
      where: {
        deliveryDetails: {
          deliveryDate: {
            gte: yesterday,
          },
        },
      },
      orderBy: { deliveryDetails: { deliveryDate: "asc" } },
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
