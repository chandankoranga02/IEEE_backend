import express from "express";
import { departmentposts, events, contactus, certificates } from "./dash.controller.js";

const router = express.Router();

router.get("/departmentposts/getall", departmentposts);
router.get("/events/getall", events);
router.get("/contactus/getall", contactus);
router.get("/certificates/getall", certificates);

export default router;
