import { applyNowService } from "./services/applynow.service.js";

const applyNow = async (req, res) => {
  try {
    const { name, email, branch, event, date } = req.body;

    // Check required fields
    if (!name || !email || !branch || !event || !date) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, email, branch, event, date) are required",
      });
    }

    const trimmedName = String(name).trim();
    const trimmedEmail = String(email).trim().toLowerCase();
    const trimmedBranch = String(branch).trim();
    const trimmedEvent = String(event).trim();
    const trimmedDate = String(date).trim();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    const application = await applyNowService({
      name: trimmedName,
      email: trimmedEmail,
      branch: trimmedBranch,
      event: trimmedEvent,
      date: trimmedDate,
    });

    return res.status(201).json({
      success: true,
      message: "Application submitted and certificate sent successfully",
      data: application,
    });
  } catch (error) {
    console.error("Apply Now Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to process certificate application",
    });
  }
};

export { applyNow };
