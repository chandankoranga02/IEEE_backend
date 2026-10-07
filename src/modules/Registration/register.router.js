import express from "express";
import { CreateRegistration, GetInfoRegistration , getAllRegistration} from "./register.controller.js";
// import verifyToken from "../../middleware/auth.middleware.js";

const router = express.Router();


router.post("/new", CreateRegistration);
router.get("/getInfo/:registrationId",  GetInfoRegistration);
router.get("/getAll", getAllRegistration);
 

export default router;
