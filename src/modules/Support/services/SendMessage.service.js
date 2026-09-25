import crypto from "crypto";
import Ticket from "../../../models/contactUs.js";

const generateTicketId = async () => {
  let ticketId;
  let exists = true;

  while (exists) {
    ticketId = `TKT${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
    exists = await Ticket.exists({ ticketId });
  }

  return ticketId;
};

const sendMessageService = async (
  name,
  email,
  message,
  subject
) => {
  const ticketId = await generateTicketId();

  const ticket = await Ticket.create({
    ticketId,
    name,
    email,
    subject,
    description: message,
  });

  return ticket;
};

export { sendMessageService };
export default sendMessageService;