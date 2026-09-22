const generateCertificateId = () => {
  const timestamp = Date.now();

  return `IEEE${timestamp}`;
};

export default generateCertificateId;