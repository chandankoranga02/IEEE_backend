import Registration from "../../../models/Registration.js";

 const getAllRegistrationService = async () => {
  const registrations = await Registration.find().sort({
    createdAt: -1,
  });

  return registrations;
};

export default getAllRegistrationService;