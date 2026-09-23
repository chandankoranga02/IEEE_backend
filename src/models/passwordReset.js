import mongoose from "mongoose";

const passwordResetSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      enum: ["ieee@gbpiet.ac.in"],
    },

    otpHash: {
      type: String,
      required: true,
    },

    expiresAt: {
      type: Date,
      required: true,
    },

    attempts: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

passwordResetSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);

const PasswordReset = mongoose.model(
  "PasswordReset",
  passwordResetSchema
);

export default PasswordReset;