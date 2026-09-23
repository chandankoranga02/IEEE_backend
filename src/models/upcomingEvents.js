import mongoose from "mongoose";

const UpcomingeventSchema = new mongoose.Schema(
  {
    postId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    eventName: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: Date,
      required: true,
    },

    lastDate: {
      type: Date,
      required: true,
    },

    overview: {
      type: String,
      required: true,
      trim: true,
    },

    imageUrl: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("UpcomingEvent", UpcomingeventSchema);

export default Event;