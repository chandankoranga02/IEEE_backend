import mongoose from "mongoose";
import Event from "../../../models/upcomingEvents.js";
import { deleteFromCloudinary } from "../../../config/cloudinary.js";

const deletePostService = async (id) => {
  const filter = mongoose.isValidObjectId(id)
    ? { $or: [{ postId: id }, { _id: id }] }
    : { postId: id };

  const post = await Event.findOne(filter);

  if (!post) {
    throw new Error("Event not found");
  }

  // Delete image from Cloudinary
  if (post.image?.publicId) {
    await deleteFromCloudinary(post.image.publicId);
  }

  // Delete event from database
  await Event.deleteOne({
    _id: post._id,
  });

  return post;
};

export { deletePostService };