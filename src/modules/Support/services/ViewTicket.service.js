import Ticket from "../../../models/contactUs.js";

const viewTicketService = async (id) => {
  const ticket = await Ticket.findById(id).select(
    "ticketId name email subject description solvedStatus createdAt ",
  );

  return ticket;
};

export { viewTicketService };
export default viewTicketService;
