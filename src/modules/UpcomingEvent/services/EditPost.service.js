import Event from "../../../models/upcomingEvents.js";
import cloudinary from "../../../config/cloudinary.js";

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
      await cloudinary.uploader.destroy(post.image.publicId);
    }
  
    const result = await cloudinary.uploader.upload(image.path, {
      folder: "ieee-upcoming-events",
    });

    post.image = {
      url: result.secure_url,
      publicId: result.public_id,
    };
  }


  post.eventName = eventName;
  post.title = title;
  post.date = date;
  post.lastDate = lastDate;
  post.overview = overview;

  await post.save();

  return post;
};

export { editPostService };