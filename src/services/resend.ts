import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  email,
  subject,
  emailTemplate: EmailTemplate,
}: {
  email: string | null;
  subject: string;
  emailTemplate: React.ReactNode;
}) {
  if (!email) return null;
  const { data, error } = await resend.emails.send({
    from: "Eleven Flower Studio <onboarding@resend.dev>",
    to: [email],
    subject,
    react: EmailTemplate,
  });

  if (error) {
    console.log({ error });
  }
  console.log({ data });
  return data;
}
