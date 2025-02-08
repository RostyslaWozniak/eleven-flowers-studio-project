const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phoneNumber = process.env.TWILIO_PHONE_NUMBER;

if (!accountSid || !authToken || !phoneNumber) {
  console.log({ accountSid, authToken, phoneNumber });
  throw new Error("Missing Twilio credentials");
}

import { Twilio } from "twilio";

const client = new Twilio(accountSid, authToken);

export async function sendSms({
  number,
  message,
}: {
  number: string;
  message: string;
}) {
  await client.messages.create({
    body: message,
    from: phoneNumber,
    to: number,
  });
}
