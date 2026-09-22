import express from "express";
import { applyNow } from "../controllers/certificateController.js";

const router = express.Router();

router.post("/applynow", applyNow);

export default router;
