"use server";

import { sendTelegramMessage } from "../lib/helpers";

const CHAT_IDS = JSON.parse(process.env.TELEGRAM_CHAT_IDS!) as string[];

export async function sendMessageAction(text: string) {
  try {
    const response = await Promise.all(
      CHAT_IDS.map((chatId) => sendTelegramMessage({ text, chatId })),
    );

    return { error: null, data: response };
  } catch (err) {
    console.error(err);
    return { error: "Something went wrong", data: null };
  }
}
