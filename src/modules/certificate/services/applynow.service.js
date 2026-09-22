import puppeteer from "puppeteer";

import Certificate from "../../../models/certificate.js";
import resend from "../../../config/resend.js";

import generateCertificateId from "../../../utils/certificateIDgenerator.js";
import certificateTemplate from "../../../templates/CertificateTemplate.js";
import emailCertificate from "../../../templates/emailtemplate.js";

const applyNowService = async ({ name, email, branch, event, date }) => {
  let browser;
  let certificate;

  try {
    // ==========================================
    // 1. Generate Certificate ID
    // ==========================================
    const certificateId = generateCertificateId();

    // ==========================================
    // 2. Save certificate data in MongoDB
    // ==========================================
    certificate = await Certificate.create({
      name,
      email,
      branch,
      eventName: event,
      certificateId,
    });

    // ==========================================
    // 3. Generate Issue Date
    // ==========================================
    const issueDate = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    // ==========================================
    // 4. Generate Certificate HTML
    // ==========================================
    const certificateHTML = certificateTemplate({
      name,
      branch,
      event,
      date,
      issueDate,
      certificateId,
      logoUrl: process.env.CERTIFICATE_LOGO_URL || null,
    });

    // ==========================================
    // 5. Launch Puppeteer
    // ==========================================
    browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
      ],
    });

    const page = await browser.newPage();

    // ==========================================
    // 6. Load Certificate HTML
    // ==========================================
    await page.setContent(certificateHTML, {
      waitUntil: "networkidle0",
    });

    // ==========================================
    // 7. Generate PDF
    // ==========================================
    const pdfBuffer = await page.pdf({
      format: "A4",
      landscape: true,
      printBackground: true,
      preferCSSPageSize: true,
      margin: {
        top: "0",
        right: "0",
        bottom: "0",
        left: "0",
      },
    });

    // ==========================================
    // 8. Generate Email HTML
    // ==========================================
    const emailHTML = emailCertificate({
      name,
      event,
      certificateId,
    });

    // ==========================================
    // 9. Send Email using Resend
    // ==========================================
    const senderEmail = process.env.EMAIL_FROM || "IEEE GBPIET <noreply@appnests.in>";

    const { data: emailData, error: emailError } = await resend.emails.send({
      from: senderEmail,
      to: [email],
      subject: `Certificate of Participation - ${event}`,
      html: emailHTML,
      attachments: [
        {
          filename: `Certificate-${name.trim().replace(/\s+/g, "-")}.pdf`,
          content: Buffer.from(pdfBuffer),
        },
      ],
    });

    // ==========================================
    // 10. Handle Resend Error
    // ==========================================
    if (emailError) {
      console.error("Resend Error:", emailError);
      // Rollback the created certificate if email sending fails
      if (certificate?._id) {
        await Certificate.findByIdAndDelete(certificate._id);
      }
      throw new Error(emailError.message || "Failed to send certificate email");
    }

    // ==========================================
    // 11. Return Result
    // ==========================================
    return {
      success: true,
      certificateId,
      participant: {
        name: certificate.name,
        email: certificate.email,
        branch: certificate.branch,
        event: certificate.eventName,
        date,
      },
      email: {
        messageId: emailData?.id || null,
        sentFrom: senderEmail,
      },
      message: "Certificate generated and sent successfully.",
    };
  } catch (error) {
    console.error("Apply Now Service Error:", error);

    // Rollback DB record if an error occurred after saving
    if (certificate?._id) {
      try {
        await Certificate.findByIdAndDelete(certificate._id);
      } catch (cleanupError) {
        console.error("Failed to clean up pending certificate:", cleanupError);
      }
    }

    throw error;
  } finally {
    // ==========================================
    // 12. Always Close Puppeteer
    // ==========================================
    if (browser) {
      await browser.close();
    }
  }
};

export { applyNowService };
