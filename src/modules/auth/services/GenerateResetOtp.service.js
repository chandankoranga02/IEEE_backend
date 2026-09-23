import bcrypt from "bcrypt";

import User from "../../../models/user.js";
import PasswordReset from "../../../models/passwordReset.js";
import { generateOTP } from "../../../utils/OtpGenerator.js";
import emailOtpTemplate from "../../../templates/ForgetPasswordOTptemplate.js";
import resend from "../../../config/resend.js";

const GenerateResetOtpService = async (email) => {
  const ADMIN_EMAIL = "ieee@gbpiet.ac.in";

  // Only the fixed admin email is allowed
  if (!email || email.trim().toLowerCase() !== ADMIN_EMAIL) {
    throw new Error("Unauthorized email");
  }

  // Check admin account exists
  const user = await User.findOne({
    email: ADMIN_EMAIL,
  });

  if (!user) {
    throw new Error("Admin account not found");
  }

  // Generate 6 digit OTP
  const otp = generateOTP(6);

  // Hash OTP before storing
  const otpHash = await bcrypt.hash(otp.toString(), 10);

  // Remove any previous OTP for this email
  await PasswordReset.deleteMany({
    email: ADMIN_EMAIL,
  });

  // OTP expires in 10 minutes
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  await PasswordReset.create({
    email: ADMIN_EMAIL,
    otpHash,
    expiresAt,
    attempts: 0,
  });

  // Send OTP email using verified sender
  const senderEmail = process.env.EMAIL_FROM || "IEEE GBPIET <noreply@appnests.in>";

  const { data, error: emailError } = await resend.emails.send({
    from: senderEmail,
    to: ADMIN_EMAIL,
    subject: "IEEE GBPIET Password Reset OTP",
    html: emailOtpTemplate(otp),
  });

  if (emailError) {
    console.error("Resend OTP Send Error:", emailError);
    throw new Error(emailError.message || "Failed to send OTP email");
  }

  return {
    success: true,
    message: "Password reset OTP sent successfully",
  };
};

export default GenerateResetOtpService;
