import Ticket from "../../../models/contactUs.js";

const closeTicketService = async (id) => {
  const ticket = await Ticket.findByIdAndUpdate(
    id,
    {
      solvedStatus: "solved",
    },
    {
      new: true,
      runValidators: true,
    }
  );

  return ticket;
};

export { closeTicketService };
export default closeTicketService;