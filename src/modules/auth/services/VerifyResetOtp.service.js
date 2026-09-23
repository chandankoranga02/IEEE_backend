import bcrypt from "bcrypt";
import User from "../../../models/user.js";
import PasswordReset from "../../../models/passwordReset.js";
import signJwt from "../../../utils/jwt.sign.js";

const ADMIN_EMAIL = "ieee@gbpiet.ac.in";
const MAX_ATTEMPTS = 5;

const VerifyResetOtpService = async (email, otp) => {
  if (!email || !otp) {
    throw new Error("Email and OTP are required");
  }

  const normalizedEmail = email.trim().toLowerCase();

  // Only the fixed admin email is allowed
  if (normalizedEmail !== ADMIN_EMAIL) {
    throw new Error("Unauthorized email");
  }

  // Ensure admin user exists
  const user = await User.findOne({ email: ADMIN_EMAIL });
  if (!user) {
    throw new Error("Admin account not found");
  }

  // Find active password reset record
  const resetRecord = await PasswordReset.findOne({ email: ADMIN_EMAIL });
  if (!resetRecord) {
    throw new Error("OTP expired or not found. Please request a new OTP.");
  }

  // Check if expired
  if (new Date() > new Date(resetRecord.expiresAt)) {
    await PasswordReset.deleteOne({ _id: resetRecord._id });
    throw new Error("OTP has expired. Please request a new OTP.");
  }

  // Check max attempts
  if (resetRecord.attempts >= MAX_ATTEMPTS) {
    await PasswordReset.deleteOne({ _id: resetRecord._id });
    throw new Error("Too many failed attempts. Please request a new OTP.");
  }

  // Compare OTP
  const isMatch = await bcrypt.compare(otp.toString().trim(), resetRecord.otpHash);
  if (!isMatch) {
    resetRecord.attempts += 1;
    await resetRecord.save();

    const remaining = MAX_ATTEMPTS - resetRecord.attempts;
    if (remaining <= 0) {
      await PasswordReset.deleteOne({ _id: resetRecord._id });
      throw new Error("Too many failed attempts. Please request a new OTP.");
    }

    throw new Error(`Invalid OTP. ${remaining} attempt(s) remaining.`);
  }

  // OTP is valid - consume it immediately to prevent replay attacks
  await PasswordReset.deleteOne({ _id: resetRecord._id });

  // Generate temporary password reset token valid for 15 minutes
  const resetToken = signJwt(
    {
      userId: user._id.toString(),
      email: ADMIN_EMAIL,
      purpose: "password_reset",
    },
    { expiresIn: "15m" }
  );

  return {
    resetToken,
  };
};

export default VerifyResetOtpService;
