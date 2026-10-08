import mongoose from "mongoose";

const StudentDirectorySchema = new mongoose.Schema(
  {
    instituteId: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    branch: {
      type: String,
      required: true,
      trim: true,
    },

    year: {
      type: Number,
      required: true,
      min: 1,
      max: 4,
    },

    batchYear: {
      type: Number,
      required: true,
    },

    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "OTHER"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("StudentDirectory", StudentDirectorySchema);