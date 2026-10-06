import Registration from "../../../models/Registration.js";

const getInfoRegistrationService = async (registrationId) => {
  if (!registrationId) {
    const error = new Error("Registration ID is required");
    error.statusCode = 400;
    throw error;
  }

  const registration = await Registration.findOne({
    registrationId,
  });

  if (!registration) {
    const error = new Error("Registration not found");
    error.statusCode = 404;
    throw error;
  }

  return registration;
};

export default getInfoRegistrationService;