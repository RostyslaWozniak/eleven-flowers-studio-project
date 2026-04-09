import { IS_TEST_PROJECT } from "@/components/environment-banner";
import { env } from "@/env";
import { sendMessageAction } from "@/features/telegram/actions/send-message.action";
import { sendTelegramMessage } from "@/features/telegram/lib/helpers";
import { db } from "@/server/db";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  const today = new Date();
  const start = new Date(today.setUTCHours(0, 0, 0, 0));
  const end = new Date(today.setUTCHours(23, 59, 59, 999));

  const orders = await db.order.findMany({
    where: {
      deliveryDetails: {
        deliveryDate: {
          gte: start,
          lte: end,
        },
      },
    },
    select: {
      paymentStatus: true,
      deliveryDetails: {
        select: {
          deliveryDate: true,
        },
      },
    },
  });

  const message = `
  CRON JOB. ${IS_TEST_PROJECT ? "TEST" : "PRODUCTION"} \n
  Orders: ${orders.length}.
  `;

  await sendTelegramMessage({ text: message, chatId: "6868922856" });

  if (orders.length === 0) {
    return NextResponse.json({ orders: 0, ok: true });
  }

  const successOrders = orders.filter(
    (order) => order.paymentStatus === "SUCCESS",
  );

  if (successOrders.length > 0) {
    const message = `
Today you have ${successOrders.length} deliveries.\n
Check all orders here <u>${env.NEXT_PUBLIC_SERVER_URL}/dashboard/orders</u>`;

    await sendMessageAction(message);
  }

  return NextResponse.json({ orders: orders.length, ok: true });
}
