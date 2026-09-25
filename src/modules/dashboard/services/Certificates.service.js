import Certificate from "../../../models/certificate.js";

const certificatesService = async () => {
  const result = await Certificate.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  const counts = {
    pending: 0,
    approved: 0,
    rejected: 0,
  };

  result.forEach((item) => {
    counts[item._id] = item.count;
  });

  return counts;
};

export default { certificatesService};