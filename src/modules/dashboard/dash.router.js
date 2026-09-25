import express from "express";
import {
  departmentposts,
  events,
  contactus,
  certificates,
} from "./dash.controller.js";
import verifyToken from "../../middleware/auth.middleware.js";

const router = express.Router();

// All dashboard endpoints require authentication
router.use(verifyToken);

router.get("/departmentposts/getall", departmentposts);
router.get("/events/getall", events);
router.get("/contactus/getall", contactus);
router.get("/certificates/getall", certificates);

export default router;
