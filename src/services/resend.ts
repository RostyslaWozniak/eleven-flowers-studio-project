import { env } from "@/env";
import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  email,
  subject,
  emailTemplate: EmailTemplate,
  name = env.RESEND_FROM_NAME,
}: {
  email: string | null;
  subject: string;
  emailTemplate: React.ReactNode;
  name?: string;
}) {
  if (!email) return null;
  const { data, error } = await resend.emails.send({
    from: `Eleven Flowers Studio <${name}@${env.RESEND_DOMAIN}>`,
    to: [email],
    subject,
    react: EmailTemplate,
  });

  if (error) {
    console.log({ error });
  }
  return data;
}
