import mongoose from "mongoose";

const Departmentpost = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    branch: {
      type: String,
      required: true,
      enum: ["CSE", "AIML", "EE", "ECE", "BT"],
      index: true,
    },

    date: {
      type: String,
      required: true,
      trim: true,
    },

    time: {
      type: String,
      default: "",
      trim: true,
    },

    venue: {
      type: String,
      required: true,
      trim: true,
    },

    organizedBy: {
      type: String,
      required: true,
      trim: true,
    },

    reportAuthor: {
      type: String,
      default: "",
      trim: true,
    },

    overview: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    keyDiscussion: {
      type: [String],
      default: [],
    },

    studentsPresent: {
      type: [String],
      default: [],
    },

    image: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Activity = mongoose.model("DepartmetnPost", Departmentpost);

export default Activity;