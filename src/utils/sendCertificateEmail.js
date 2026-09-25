import resend from "../config/resend.js";
import emailCertificate from "../templates/emailtemplate.js";

const SENDER_EMAIL = process.env.EMAIL_FROM || "IEEE GBPIET <noreply@appnests.in>";

/**
 * Sends a certificate PDF to the recipient via Resend.
 * @param {{ name: string, email: string, event: string, certificateId: string, pdfBuffer: Buffer }} params
 * @returns {Promise<{ messageId: string|null }>}
 */
const sendCertificateEmail = async ({
  name,
  email,
  event,
  certificateId,
  pdfBuffer,
}) => {
  const emailHTML = emailCertificate({ name, event, certificateId });

  const { data: emailData, error: emailError } = await resend.emails.send({
    from: SENDER_EMAIL,
    to: [email],
    subject: `Certificate of Participation - ${event}`,
    html: emailHTML,
    attachments: [
      {
        filename: `Certificate-${name.trim().replace(/\s+/g, "-")}.pdf`,
        content: pdfBuffer,
      },
    ],
  });

  if (emailError) {
    throw new Error(emailError.message || "Failed to send certificate email");
  }

  return { messageId: emailData?.id || null };
};

export default sendCertificateEmail;
