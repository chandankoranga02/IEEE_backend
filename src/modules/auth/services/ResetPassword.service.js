import bcrypt from "bcrypt";
import User from "../../../models/user.js";
import PasswordReset from "../../../models/passwordReset.js";
import JwtVerify from "../../../utils/jwt.verify.js";

const ADMIN_EMAIL = "ieee@gbpiet.ac.in";

const ResetPasswordService = async (resetToken, newPassword) => {
  if (!resetToken) {
    throw new Error("Reset token is required");
  }

  if (!newPassword || typeof newPassword !== "string") {
    throw new Error("New password is required");
  }

  if (newPassword.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }

  // Verify and decode resetToken
  let decoded;
  try {
    decoded = JwtVerify(resetToken);
  } catch (error) {
    if (error?.name === "TokenExpiredError") {
      throw new Error("Reset token has expired. Please request a new OTP.");
    }
    throw new Error("Invalid or corrupted reset token");
  }

  // Validate token payload
  if (!decoded || decoded.purpose !== "password_reset" || !decoded.email) {
    throw new Error("Invalid reset token payload");
  }

  const normalizedEmail = decoded.email.trim().toLowerCase();
  if (normalizedEmail !== ADMIN_EMAIL) {
    throw new Error("Unauthorized reset token");
  }

  // Find user
  const user = await User.findOne({ email: ADMIN_EMAIL });
  if (!user) {
    throw new Error("Admin user not found");
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update password
  user.hashedPassword = hashedPassword;
  await user.save();

  // Clear any existing password reset records for this user
  await PasswordReset.deleteMany({ email: ADMIN_EMAIL });

  return {
    success: true,
    message: "Password reset successfully",
  };
};

export default ResetPasswordService;
