import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

export const sendNewsletterEmail = async ({
  to,
  subject,
  html,
}) => {
  const response =
    await resend.emails.send({
      from:
        "BYTEPOST <onboarding@resend.dev>",

      to,

      subject,

      html,
    });

  return response;
};