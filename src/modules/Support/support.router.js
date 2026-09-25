import express from "express";
import {
  SendMsg,
  AllTickets,
  ViewTicket,
  RejectTicket,
  CloseTicket,
} from "./support.controller.js";
import verifyToken from "../../middleware/auth.middleware.js";

const router = express.Router();

// Public route: submit support ticket / contact form
router.post("/sendmsg", SendMsg);

// Protected admin routes: manage support tickets
router.get("/allticket", verifyToken, AllTickets);
router.get("/viewTicket/:id", verifyToken, ViewTicket);
router.patch("/closeTicket/:id", verifyToken, CloseTicket);
router.patch("/Reject/:id", verifyToken, RejectTicket);

export default router;
