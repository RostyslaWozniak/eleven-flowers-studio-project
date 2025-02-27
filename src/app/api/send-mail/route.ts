import { PurchaseSucceedTemplate } from "@/components/emails/purchase-succeed-template";
import { sendEmail } from "@/services/resend";
import { getTranslations } from "next-intl/server";
import { NextResponse } from "next/server";

export async function POST() {
  const locale = "ru";
  const t = await getTranslations({
    namespace: "emails.purchase_success",
    locale,
  });
  await sendEmail({
    email: "rostyslav.vozniak.dev@gmail.com",
    subject: t("title"),
    emailTemplate: PurchaseSucceedTemplate({
      name: "Rostyslav",
      price: 123,
      locale,
    }),
  });

  return new NextResponse("OK", { status: 200 });
}
