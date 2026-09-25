import Ticket from "../../../models/contactUs.js";

const rejectTicketService = async (id) => {
  const ticket = await Ticket.findByIdAndUpdate(
    id,
    {
      solvedStatus: "rejected",
    },
    {
      new: true,
      runValidators: true,
    },
  );

  return ticket;
};

export { rejectTicketService };
export default rejectTicketService;
