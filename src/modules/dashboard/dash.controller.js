import departmentPostsService  from "./services/DepartmentPosts.service.js";
import  eventsService  from "./services/Events.service.js";
import  contactUsService  from "./services/ContactUs.service.js";
import  certificatesService  from "./services/Certificates.service.js";

const departmentposts = async (req, res) => {
  try {
    const posts = await departmentPostsService();

    return res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    console.error("Department posts dashboard error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch department posts",
    });
  }
};

const events = async (req, res) => {
  try {
    const eventData = await eventsService();

    return res.status(200).json({
      success: true,
      data: eventData,
    });
  } catch (error) {
    console.error("Events dashboard error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch events",
    });
  }
};

const contactus = async (req, res) => {
  try {
    const contactData = await contactUsService();

    return res.status(200).json({
      success: true,
      data: contactData,
    });
  } catch (error) {
    console.error("Contact us dashboard error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch contact us statistics",
    });
  }
};

const certificates = async (req, res) => {
  try {
    const certificateData = await certificatesService();

    return res.status(200).json({
      success: true,
      data: certificateData,
    });
  } catch (error) {
    console.error("Certificates dashboard error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch certificate statistics",
    });
  }
};

export {
  departmentposts,
  events,
  contactus,
  certificates,
};