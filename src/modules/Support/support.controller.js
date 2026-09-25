import sendMessageService from "./services/SendMessage.service.js";
import getAllTicketsService from "./services/GetAllTickets.service.js";
import viewTicketService from "./services/ViewTicket.service.js";
import rejectTicketService from "./services/RejectTicket.service.js";
import closeTicketService from "./services/CloseTicket.service.js";

const SendMsg = async (req, res) => {
  try {
    const { name, email, message, subject } = req.body;

    const ticket = await sendMessageService(name, email, message, subject);

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      ticket,
    });
  } catch (error) {
    console.error("Send message error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
};

const AllTickets = async (req, res) => {
  try {
    const tickets = await getAllTicketsService();

    return res.status(200).json({
      success: true,
      count: tickets.length,
      tickets,
    });
  } catch (error) {
    console.error("Get all tickets error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch tickets",
    });
  }
};

const ViewTicket = async (req, res) => {
  try {
    const { id } = req.params;

    const ticket = await viewTicketService(id);

    return res.status(200).json({
      success: true,
      ticket,
    });
  } catch (error) {
    console.error("View ticket error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch ticket",
    });
  }
};

const RejectTicket = async (req, res) => {
  try {
    const { id } = req.params;

    const ticket = await rejectTicketService(id);

    return res.status(200).json({
      success: true,
      message: "Ticket rejected successfully",
      ticket,
    });
  } catch (error) {
    console.error("Reject ticket error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to reject ticket",
    });
  }
};

const CloseTicket = async (req, res) => {
  try {
    const { id } = req.params;

    const ticket = await closeTicketService(id);

    return res.status(200).json({
      success: true,
      message: "Ticket closed successfully",
      ticket,
    });
  } catch (error) {
    console.error("Close ticket error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to close ticket",
    });
  }
};

export { SendMsg, AllTickets, ViewTicket, RejectTicket, CloseTicket };
