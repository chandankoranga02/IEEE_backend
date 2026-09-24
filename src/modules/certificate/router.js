import express from "express";
import {
  applyNow,
  allCertificates,
  approved,
  rejected,
  adminApply,
} from "./controller.js";
import { validateCertificateFields } from "./certificate.validation.js";

const router = express.Router();

router.post("/applynow", validateCertificateFields, applyNow);
router.get("/all", allCertificates);
router.patch("/approved/:id", approved);
router.patch("/rejected/:id", rejected);
router.post("/adminApply", validateCertificateFields, adminApply);

export default router;
