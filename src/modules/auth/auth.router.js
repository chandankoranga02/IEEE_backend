import express from "express";
import { Login , Logout } from "./auth.controller.js";
import { GenerateResetOtp , VerifyResetOtp , ResetPassword} from "./otp.controller.js"
import { loginLimiter } from "../../middleware/ratelimiter.js"

const router = express.Router();

// 
router.post("/login", loginLimiter , Login);
router.post("/logout", Logout);

// OTP Apis
router.post("/resetPassword/otp/verifyOtp" , VerifyResetOtp);
router.patch("/resetPassword", ResetPassword)
router.post("/resetPassword/otp/generateOTP", GenerateResetOtp);

export default router;
