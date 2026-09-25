import Event from "../../../models/upcomingEvents.js";

const getAllPostsService = async () => {
  const posts = await Event.find().sort({ createdAt: -1 });

  return posts;
};

export { getAllPostsService };