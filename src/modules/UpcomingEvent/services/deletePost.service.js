import Event from "../../../models/upcomingEvents.js";
import { deleteFromCloudinary } from "../../../config/cloudinary.js";

const deletePostService = async (id) => {
  const post = await Event.findOne({
    postId: id,
  });

  if (!post) {
    throw new Error("Event not found");
  }

  // Delete image from Cloudinary
  if (post.image?.publicId) {
    await deleteFromCloudinary(post.image.publicId);
  }

  // Delete event from database
  await Event.deleteOne({
    postId: id,
  });

  return post;
};

export { deletePostService };