import express from "express";
import  getAllUsers  from "./dir.controller.js";
// import verifyToken from "../../middleware/auth.middleware.js";

const router = express.Router();


router.get("/getAll",  getAllUsers);
 

export default router;
