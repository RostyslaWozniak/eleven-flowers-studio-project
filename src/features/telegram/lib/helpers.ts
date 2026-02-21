const env = {
  TELEGRAM_ACCESS_TOKEN: process.env.TELEGRAM_ACCESS_TOKEN,
};
export async function sendTelegramMessage({
  text,
  chatId,
}: {
  text: string;
  chatId: string;
}) {
  await fetch(
    `https://api.telegram.org/bot${env.TELEGRAM_ACCESS_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,

        text,
      }),
    },
  );
}
