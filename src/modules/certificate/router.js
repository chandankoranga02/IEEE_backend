import express from "express";
import { applyNow } from "./controller.js";

const router = express.Router();

// Health/discovery route for certificate module
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Certificate module router is active",
    endpoints: {
      applyNow: "POST /api/v1/certificate/applynow (or /apply-now)",
    },
  });
});

router.post("/applynow", applyNow);
router.post("/apply-now", applyNow);

export default router;
