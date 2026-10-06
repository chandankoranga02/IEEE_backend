import getInfoRegistrationService from "./services/GetInfo.service.js";
import createRegistrationService from "./services/NewRegistration.service.js";
import GetAllRegistrationService from "./services/getAllRegistration.service.js";

export const CreateRegistration = async (req, res) => {
  try {
    const { mode } = req.query;

    const { eventName, date,  teamName, members } = req.body;

    const result = await createRegistrationService({
      eventName,
      date, 
      teamName,
      members,
      mode,
    });

    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Create Registration Error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};


export const GetInfoRegistration = async (req, res) => {
  try {
    const { registrationId } = req.params;

    const result = await getInfoRegistrationService(registrationId);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Get Registration Info Error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};


export const getAllRegistration = async (req, res) => {
  try {
    const result = await GetAllRegistrationService();

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Get All Registration Error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};