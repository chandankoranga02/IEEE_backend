import Event from "../../../models/upcomingEvents.js";
import { uploadToCloudinary } from "../../../config/cloudinary.js";
import generatePostId from "../../../utils/EventsIDgenerator.js";

const createPostService = async ({
  eventName,
  title,
  date,
  lastDate,
  overview,
  image,
}) => {
  let postId;
  let attempts = 0;
  const MAX_ATTEMPTS = 10;

  while (attempts < MAX_ATTEMPTS) {
    const generatedId = generatePostId();

    const existingPost = await Event.findOne({
      postId: generatedId,
    });

    if (!existingPost) {
      postId = generatedId;
      break;
    }

    attempts++;
  }

  if (!postId) {
    throw new Error("Unable to generate a unique post ID");
  }

  let imageData = {
    url: "",
    publicId: "",
  };

  if (image) {
    const uploaded = await uploadToCloudinary(image, "ieee-upcoming-events");
    if (uploaded && uploaded.url) {
      imageData = uploaded;
    }
  }


  const post = await Event.create({
    postId,
    eventName,
    title,
    date,
    lastDate,
    overview,
    image: imageData,
  });

  return post;
};

export { createPostService };