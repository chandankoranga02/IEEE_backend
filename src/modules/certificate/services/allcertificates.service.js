import Certificate from "../../../models/certificate.js";


const allCertificatesService = async () => {
  const certificates = await Certificate.find().sort({ createdAt: -1 });
  return certificates;
};

export { allCertificatesService };
