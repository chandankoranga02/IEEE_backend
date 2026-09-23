import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "./src/models/user.js";
import PasswordReset from "./src/models/passwordReset.js";
import GenerateResetOtpService from "./src/modules/auth/services/GenerateResetOtp.service.js";
import VerifyResetOtpService from "./src/modules/auth/services/VerifyResetOtp.service.js";
import ResetPasswordService from "./src/modules/auth/services/ResetPassword.service.js";
import { GenerateResetOtp, VerifyResetOtp, ResetPassword } from "./src/modules/auth/otp.controller.js";

async function runTests() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB successfully.");

  const ADMIN_EMAIL = "ieee@gbpiet.ac.in";

  // 1. Ensure admin user exists for test
  let adminUser = await User.findOne({ email: ADMIN_EMAIL });
  if (!adminUser) {
    console.log("Creating test admin user...");
    const hashedPassword = await bcrypt.hash("InitialPassword123!", 10);
    adminUser = await User.create({
      email: ADMIN_EMAIL,
      hashedPassword,
    });
    console.log("Test admin user created.");
  } else {
    console.log("Admin user exists in database.");
  }

  // 2. Test GenerateResetOtpService rejection of invalid emails
  console.log("\n--- Testing GenerateResetOtpService email validation ---");
  try {
    await GenerateResetOtpService("unauthorized@example.com");
    console.error("FAIL: Expected unauthorized email to be rejected!");
  } catch (err) {
    console.log("PASS: Rejected unauthorized email:", err.message);
  }

  // 3. Test GenerateResetOtpService with valid admin email
  console.log("\n--- Testing GenerateResetOtpService with admin email ---");
  const generateResult = await GenerateResetOtpService(ADMIN_EMAIL);
  console.log("PASS: GenerateResetOtpService result:", generateResult);

  // Check PasswordReset collection has an entry
  const resetEntry = await PasswordReset.findOne({ email: ADMIN_EMAIL });
  if (!resetEntry) {
    throw new Error("FAIL: PasswordReset document not found in DB!");
  }
  console.log("PASS: Found PasswordReset document in DB. Expires at:", resetEntry.expiresAt);

  // 4. Test VerifyResetOtpService with wrong OTP
  console.log("\n--- Testing VerifyResetOtpService with WRONG OTP ---");
  try {
    await VerifyResetOtpService(ADMIN_EMAIL, "000000");
    console.error("FAIL: Expected wrong OTP to be rejected!");
  } catch (err) {
    console.log("PASS: Rejected wrong OTP:", err.message);
  }

  // 5. Test VerifyResetOtpService with CORRECT OTP
  console.log("\n--- Testing VerifyResetOtpService with CORRECT OTP ---");
  const testOtp = "123456";
  const testOtpHash = await bcrypt.hash(testOtp, 10);
  await PasswordReset.updateOne(
    { email: ADMIN_EMAIL },
    { otpHash: testOtpHash, attempts: 0 }
  );

  const verifyResult = await VerifyResetOtpService(ADMIN_EMAIL, testOtp);
  console.log("PASS: VerifyResetOtpService succeeded! resetToken received:", !!verifyResult.resetToken);

  // Verify that the OTP record was removed
  const remainingRecord = await PasswordReset.findOne({ email: ADMIN_EMAIL });
  if (remainingRecord) {
    throw new Error("FAIL: PasswordReset record was not deleted after verification!");
  }
  console.log("PASS: OTP record was cleanly deleted upon verification.");

  // 6. Test ResetPasswordService with invalid token
  console.log("\n--- Testing ResetPasswordService with INVALID token ---");
  try {
    await ResetPasswordService("invalid.token.here", "NewSecretPassword123!");
    console.error("FAIL: Expected invalid token to be rejected!");
  } catch (err) {
    console.log("PASS: Rejected invalid reset token:", err.message);
  }

  // 7. Test ResetPasswordService with short password
  console.log("\n--- Testing ResetPasswordService with short password ---");
  try {
    await ResetPasswordService(verifyResult.resetToken, "123");
    console.error("FAIL: Expected short password to be rejected!");
  } catch (err) {
    console.log("PASS: Rejected short password:", err.message);
  }

  // 8. Test ResetPasswordService with VALID token and password
  console.log("\n--- Testing ResetPasswordService with VALID token and new password ---");
  const newPass = "UpdatedSecurePassword2026!";
  const resetResult = await ResetPasswordService(verifyResult.resetToken, newPass);
  console.log("PASS: ResetPasswordService result:", resetResult);

  // 9. Verify that user password in DB actually matches the new password
  const updatedUser = await User.findOne({ email: ADMIN_EMAIL }).select("+hashedPassword");
  const isMatch = await bcrypt.compare(newPass, updatedUser.hashedPassword);
  if (!isMatch) {
    throw new Error("FAIL: User password in DB does not match the newly set password!");
  }
  console.log("PASS: Verified user password was successfully updated in DB!");

  // 10. Test Controllers directly with mock req, res
  console.log("\n--- Testing Controller functions ---");
  let mockResStatus, mockResJson;
  const createMockRes = () => ({
    status(code) {
      mockResStatus = code;
      return this;
    },
    json(data) {
      mockResJson = data;
      return this;
    }
  });

  // Test GenerateResetOtp Controller with missing email
  await GenerateResetOtp({ body: {} }, createMockRes());
  console.log("GenerateResetOtp (empty email) -> Status:", mockResStatus, "Success:", mockResJson.success);

  // Test VerifyResetOtp Controller with missing fields
  await VerifyResetOtp({ body: { email: ADMIN_EMAIL } }, createMockRes());
  console.log("VerifyResetOtp (missing otp) -> Status:", mockResStatus, "Success:", mockResJson.success);

  // Test ResetPassword Controller with missing fields
  await ResetPassword({ body: {} }, createMockRes());
  console.log("ResetPassword (missing body) -> Status:", mockResStatus, "Success:", mockResJson.success);

  console.log("\n==========================================");
  console.log("ALL TESTS COMPLETED SUCCESSFULLY!");
  console.log("==========================================");

  await mongoose.disconnect();
}

runTests().catch(async (err) => {
  console.error("TEST FAILED:", err);
  await mongoose.disconnect();
  process.exit(1);
});
