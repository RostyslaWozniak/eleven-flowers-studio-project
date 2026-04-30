import { IS_TEST_PROJECT } from "@/components/environment-banner";
import { env } from "@/env";
import { sendMessageAction } from "@/features/telegram/actions/send-message.action";
import { sendTelegramMessage } from "@/features/telegram/lib/helpers";
import { api } from "@/trpc/server";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const orders = await api.cron.order.getOrders();
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
    return NextResponse.json({ orders: 0, ok: true });
  } catch (err) {
    console.error("CRON ERROR:", err);

    let message = "";

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      message = `❌ Prisma error (known): ${err.code}`;
    } else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
      message = `❌ Prisma error (unknown)`;
    } else if (err instanceof Prisma.PrismaClientInitializationError) {
      message = `❌ Prisma init error (DB down?)`;
    } else if (err instanceof Prisma.PrismaClientRustPanicError) {
      message = `❌ Prisma panic (serious issue)`;
    } else if (err instanceof Error) {
      message = `❌ General error: ${err.message}`;
    } else {
      message = `❌ Unknown error`;
    }

    // Telegram (zabezpiecz)
    try {
      await sendTelegramMessage({
        text: `CRON ERROR:\n${message}`,
        chatId: "6868922856",
      });
    } catch (e) {
      console.error("Telegram failed:", e);
    }

    return new Response("Error", { status: 200 });
  }
}
