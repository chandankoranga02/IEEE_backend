import Certificate from "../../../models/certificate.js";
import generateCertificateId from "../../../utils/certificateIDgenerator.js";
import WinnertemplateCertificate from "../../../templates/WinnerCertificate.js";
import generateCertificatePDF from "../../../utils/generateCertificatePDF.js";
import sendCertificateEmail from "../../../utils/sendCertificateEmail.js";

const adminApplyService = async ({
  name,
  email,
  branch,
  event,
  date,
  position,
}) => {
  const certificateId = generateCertificateId();

  const certificate = await Certificate.create({
    name,
    email,
    branch,
    eventName: event,
    date,
    position: position || null,
    certificateId,
    status: "approved",
  });


  let pdfBuffer;
  try {
    const issueDate = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    const html = WinnertemplateCertificate({
      name,
      branch,
      event,
      date,
      certificateId,
      issueDate,
      logoUrl: process.env.CERTIFICATE_LOGO_URL || null,
      position,
    });

    pdfBuffer = await generateCertificatePDF(html);
  } catch (pdfError) {
    await Certificate.findByIdAndDelete(certificate._id);
    console.error("Admin Apply Service – PDF generation failed:", pdfError);
    throw new Error("Failed to generate certificate PDF");
  }


  let messageId;
  try {
    const result = await sendCertificateEmail({
      name,
      email,
      event,
      certificateId,
      pdfBuffer,
    });
    messageId = result.messageId;
  } catch (emailError) {
    await Certificate.findByIdAndDelete(certificate._id);
    console.error("Admin Apply Service – Email delivery failed:", emailError);
    throw new Error("Failed to send certificate email");
  }

  return {
    certificate,
    email: { messageId },
  };
};

export { adminApplyService };
