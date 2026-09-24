import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    branch: {
      type: String,
      required: true,
    },

    eventName: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    position: {
      type: String,
      enum: ["1st", "2nd", "3rd"],
      required: false,
      default: null,
    },

    certificateId: {
      type: String,
      required: true,
      unique: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

const Certificate = mongoose.model(
  "Certificate",
  certificateSchema,
  "certificates",
);

export default Certificate;
