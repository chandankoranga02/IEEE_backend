import GenerateResetOtpService from "./services/GenerateResetOtp.service.js";
import VerifyResetOtpService from "./services/VerifyResetOtp.service.js";
import ResetPasswordService from "./services/ResetPassword.service.js";

const GenerateResetOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    await GenerateResetOtpService(email);

    return res.status(200).json({
      success: true,
      message: "Password reset OTP sent successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to send OTP",
    });
  }
};

const VerifyResetOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const result = await VerifyResetOtpService(email, otp);

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      resetToken: result.resetToken,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "OTP verification failed",
    });
  }
};

const ResetPassword = async (req, res) => {
  try {
    const resetToken =
      req.body.resetToken ||
      req.headers["x-reset-token"] ||
      req.headers.authorization?.replace(/^Bearer\s+/i, "");
    const { newPassword } = req.body;

    if (!resetToken || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Reset token and new password are required",
      });
    }

    await ResetPasswordService(resetToken, newPassword);

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Password reset failed",
    });
  }
};

export {
  GenerateResetOtp,
  VerifyResetOtp,
  ResetPassword,
};

export default {
  GenerateResetOtp,
  VerifyResetOtp,
  ResetPassword,
};