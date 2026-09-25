import Ticket from "../../../models/contactUs.js";

const getAllTicketsService = async () => {
  const tickets = await Ticket.find().sort({ createdAt: -1 });
  return tickets;
};

export default { getAllTicketsService };
