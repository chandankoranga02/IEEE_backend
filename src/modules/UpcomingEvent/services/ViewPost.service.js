import Event from "../../../models/upcomingEvents.js";

const viewPostService = async (id) => {
  const post = await Event.findOne({
    postId: id,
  });

  if (!post) {
    throw new Error("Event not found");
  }

  return post;
};

export { viewPostService };