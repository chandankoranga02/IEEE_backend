import Event from "../../../models/upcomingEvents.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../../../config/cloudinary.js";

const editPostService = async (
  id,
  eventName,
  title,
  date,
  lastDate,
  overview,
  image,
) => {
  const post = await Event.findOne({
    postId: id,
  });

  if (!post) {
    throw new Error("Event not found");
  }

  if (image) {
    if (post.image?.publicId) {
      await deleteFromCloudinary(post.image.publicId);
    }

    const uploaded = await uploadToCloudinary(image, "ieee-upcoming-events");
    if (uploaded && uploaded.url) {
      post.image = {
        url: uploaded.url,
        publicId: uploaded.publicId,
      };
    }
  }


  if (eventName !== undefined) post.eventName = eventName;
  if (title !== undefined) post.title = title;
  if (date !== undefined) post.date = date;
  if (lastDate !== undefined) post.lastDate = lastDate;
  if (overview !== undefined) post.overview = overview;

  await post.save();

  return post;
};

export { editPostService };