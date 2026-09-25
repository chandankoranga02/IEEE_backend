import express from "express";
import {
  SendMsg,
  AllTickets,
  ViewTicket,
  RejectTicket,
  CloseTicket,
} from "./support.controller.js";

const router = express.Router();

router.post("/sendmsg", SendMsg);
router.get("allticket", AllTickets);
router.patch("/closeTicket/:id", CloseTicket);
router.patch("/Reject/:id", RejectTicket);
router.get("/viewTicket/:id", ViewTicket);

export default router;
