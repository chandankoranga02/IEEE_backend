import Certificate from "../../../models/certificate.js";
import templateCertificate from "../../../templates/CertificateTemplate.js";
import generateCertificatePDF from "../../../utils/generateCertificatePDF.js";
import sendCertificateEmail from "../../../utils/sendCertificateEmail.js";


const approvedService = async (id) => {
 
  const certificate = await Certificate.findById(id);

  if (!certificate) {
    const err = new Error("Certificate not found");
    err.statusCode = 404;
    throw err;
  }

  if (certificate.status !== "pending") {
    const err = new Error(
      `Certificate is already "${certificate.status}" and cannot be approved`,
    );
    err.statusCode = 400;
    throw err;
  }


  certificate.status = "approved";
  await certificate.save();


  let pdfBuffer;
  try {
    const issueDate = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    const html = templateCertificate({
      name: certificate.name,
      branch: certificate.branch,
      event: certificate.eventName,
      date: certificate.date,
      certificateId: certificate.certificateId,
      issueDate,
      logoUrl: process.env.CERTIFICATE_LOGO_URL || null,
    });

    pdfBuffer = await generateCertificatePDF(html);
} catch (pdfError) {
  console.error("========== PDF ERROR ==========");
  console.error("Error:", pdfError);
  console.error("Message:", pdfError?.message);
  console.error("Stack:", pdfError?.stack);
  console.error("================================");

  certificate.status = "pending";
  await certificate.save();

  throw pdfError; // temporarily original error throw karo
}


  let messageId;
  try {
    const result = await sendCertificateEmail({
      name: certificate.name,
      email: certificate.email,
      event: certificate.eventName,
      certificateId: certificate.certificateId,
      pdfBuffer,
    });
    messageId = result.messageId;
  } catch (emailError) {
    // Rollback status on email failure
    certificate.status = "pending";
    await certificate.save();
    console.error("Approved Service – Email delivery failed:", emailError);
    const err = new Error("Certificate approved but email delivery failed");
    err.statusCode = 502;
    throw err;
  }

  return {
    certificate,
    email: { messageId },
  };
};

export { approvedService };
