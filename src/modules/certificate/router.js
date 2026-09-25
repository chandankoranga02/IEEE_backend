import express from "express";
import {
  applyNow,
  allCertificates,
  approved,
  rejected,
  adminApply,
} from "./controller.js";
import { validateCertificateFields } from "./certificate.validation.js";
import verifyToken from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/applynow", validateCertificateFields, applyNow);
router.get("/all", verifyToken, allCertificates);
router.patch("/approved/:id", verifyToken, approved);
router.patch("/rejected/:id", verifyToken, rejected);
router.post("/adminApply", verifyToken, validateCertificateFields, adminApply);

export default router;
