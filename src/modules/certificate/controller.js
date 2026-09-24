import { applyNowService } from "./services/applynow.service.js";
import { allCertificatesService } from "./services/allcertificates.service.js";
import { approvedService } from "./services/approved.service.js";
import { rejectedService } from "./services/rejected.service.js";
import { adminApplyService } from "./services/adminApply.service.js";

// ── POST /applynow ──────────────────────────────────────────────────────────
const applyNow = async (req, res) => {
  try { 
    const application = await applyNowService(req.certificateData);

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully. Awaiting admin approval.",
      data: application,
    });
  } catch (error) {
    console.error("applyNow Controller Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to submit certificate application",
    });
  }
};

// ── GET /all ────────────────────────────────────────────────────────────────
const allCertificates = async (req, res) => {
  try {
    const certificates = await allCertificatesService();

    return res.status(200).json({
      success: true,
      count: certificates.length,
      data: certificates,
    });
  } catch (error) {
    console.error("allCertificates Controller Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve certificates",
    });
  }
};

// ── PATCH /approved/:id ─────────────────────────────────────────────────────
const approved = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await approvedService(id);

    return res.status(200).json({
      success: true,
      message: "Certificate approved and emailed to the applicant successfully",
      data: result.certificate,
      email: result.email,
    });
  } catch (error) {
    console.error("approved Controller Error:", error);
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      success: false,
      message: error.message || "Failed to approve certificate",
    });
  }
};

// ── PATCH /rejected/:id ─────────────────────────────────────────────────────
const rejected = async (req, res) => {
  try {
    const { id } = req.params;
    const certificate = await rejectedService(id);

    return res.status(200).json({
      success: true,
      message: "Certificate rejected successfully",
      data: certificate,
    });
  } catch (error) {
    console.error("rejected Controller Error:", error);
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      success: false,
      message: error.message || "Failed to reject certificate",
    });
  }
};

// ── POST /adminApply ────────────────────────────────────────────────────────
const adminApply = async (req, res) => {
  try {

    const result = await adminApplyService(req.certificateData);

    return res.status(201).json({
      success: true,
      message: "Certificate issued and emailed successfully",
      data: result.certificate,
      email: result.email,
    });
  } catch (error) {
    console.error("adminApply Controller Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to issue certificate",
    });
  }
};

export { applyNow, allCertificates, approved, rejected, adminApply };
