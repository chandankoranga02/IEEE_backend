import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    instituteId: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
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

    year: {
      type: Number,
      required: true,
      min: 1,
      max: 4,
    },

    branch: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false },
);

const registrationSchema = new mongoose.Schema(
  {
    registrationId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    date: {
      type: String,
      required: true,
    },

    eventName: {
      type: String,
      required: true,
      trim: true,
    },

    mode: {
      type: String,
      required: true,
      enum: ["INDIVIDUAL", "TEAM"],
    },

    teamName: {
      type: String,
      trim: true,
      default: null,
    },

    members: {
      type: [memberSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Team name required only for TEAM
const Registration = mongoose.model("Registration", registrationSchema);

export default Registration;
