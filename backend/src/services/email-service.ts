import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendAnnouncementEmail = async (
  to: string,
  title: string,
  message: string
) => {
  try {
    const fromEmail = process.env.RESEND_FROM_EMAIL;

    if (!fromEmail) {
      throw new Error("RESEND_FROM_EMAIL is not configured");
    }

    const result = await resend.emails.send({
      from: fromEmail,
      to,
      subject: title,
      text: message,
    });

    console.log(`Email sent to ${to}`);

    return result;
  } catch (error) {
    console.error(`Failed to send email to ${to}:`, error);
    throw error;
  }
};