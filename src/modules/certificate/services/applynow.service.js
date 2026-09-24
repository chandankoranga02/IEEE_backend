import Certificate from "../../../models/certificate.js";
import generateCertificateId from "../../../utils/certificateIDgenerator.js";


const applyNowService = async ({ name, email, branch, event, date, position }) => {
  const certificateId = generateCertificateId();

  const certificate = await Certificate.create({
    name,
    email,
    branch,
    eventName: event,
    date,
    position: position || null,
    certificateId,
    status: "pending",
  });

  return certificate;
};

export { applyNowService };
