import mongoose from "mongoose";
import Event from "../../../models/upcomingEvents.js";

const viewPostService = async (id) => {
  const filter = mongoose.isValidObjectId(id)
    ? { $or: [{ postId: id }, { _id: id }] }
    : { postId: id };

  const post = await Event.findOne(filter);

  if (!post) {
    throw new Error("Event not found");
  }

  return post;
};

export { viewPostService };