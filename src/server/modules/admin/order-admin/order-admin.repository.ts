import { db } from "@/server/db";
import { OrderAdminQueries } from "./order-admin.query";
import type { OrderAdminGetAllSchema } from "./order-admin.types";
import { subDays } from "date-fns/subDays";
import { endOfDay, startOfDay } from "date-fns";

export class OrderAdminRepository {
  public static findMany = async ({
    take,
    skip,
    filter,
  }: OrderAdminGetAllSchema) => {
    switch (filter) {
      case "comming": {
        const today = new Date();
        const yesterday = subDays(today, 1);

        const orders = await db.order.findMany({
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

        const count = await db.order.count({
          where: {
            deliveryDetails: {
              deliveryDate: {
                gte: yesterday,
              },
            },
          },
        });
        return { orders, count };
      }
      case "today": {
        const today = new Date(new Date().setUTCHours(6, 0, 0, 0));
        const startOfTheDay = startOfDay(today);
        const endOfTheDay = endOfDay(today);

        const orders = await db.order.findMany({
          select: OrderAdminQueries.selectFields(),
          where: {
            deliveryDetails: {
              deliveryDate: {
                gte: startOfTheDay,
                lte: endOfTheDay,
              },
            },
          },
          orderBy: { deliveryDetails: { deliveryDate: "asc" } },
          take,
          skip,
        });
        const count = await db.order.count({
          where: {
            deliveryDetails: {
              deliveryDate: {
                gte: startOfTheDay,
                lte: endOfTheDay,
              },
            },
          },
        });
        return { orders, count };
      }

      default: {
        const orders = await db.order.findMany({
          select: OrderAdminQueries.selectFields(),

          orderBy: { deliveryDetails: { deliveryDate: "asc" } },
          take,
          skip,
        });
        const count = await db.order.count();
        return { orders, count };
      }
    }
  };

  public static delete = async (id: string) => {
    return await db.order.delete({ where: { id } });
  };
}
