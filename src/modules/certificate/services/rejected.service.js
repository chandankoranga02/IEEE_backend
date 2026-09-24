import Certificate from "../../../models/certificate.js";


const rejectedService = async (id) => {
  const certificate = await Certificate.findById(id);

  if (!certificate) {
    const err = new Error("Certificate not found");
    err.statusCode = 404;
    throw err;
  }

  if (certificate.status === "rejected") {
    const err = new Error("Certificate is already rejected");
    err.statusCode = 400;
    throw err;
  }

  certificate.status = "rejected";
  await certificate.save();

  return certificate;
};

export { rejectedService };
