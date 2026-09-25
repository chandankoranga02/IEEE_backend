import Ticket from "../../../models/contactUs.js";

const contactUsService = async () => {
  const result = await Ticket.aggregate([
    {
      $group: {
        _id: "$solvedStatus",
        count: { $sum: 1 },
      },
    },
  ]);

  const counts = {
    pending: 0,
    rejected: 0,
    solved: 0,
  };

  result.forEach((item) => {
    counts[item._id] = item.count;
  });

  return counts;
};

export default contactUsService ;