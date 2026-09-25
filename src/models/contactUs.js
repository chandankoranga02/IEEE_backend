import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    ticketId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    solvedStatus: {
      type: String,
      enum: ["pending", "rejected", "solved"],
      default: "pending",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;