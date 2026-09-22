import { applyNowService } from "../services/applyNow.service.js";

const applyNow = async (req, res) => {
  try {
    const { name, email, branch, event, date } = req.body;

    if (!name || !email || !branch || !event || !date) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const application = await applyNowService({
      name,
      email,
      branch,
      event,
      date,
    });

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: application,
    });
  } catch (error) {
    console.error("Apply Now Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export { applyNow };
