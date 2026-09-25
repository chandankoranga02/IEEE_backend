import { createPostService } from "./services/CreatePost.service.js";
import { deletePostService } from "./services/deletePost.service.js";
import { editPostService } from "./services/EditPost.service.js";
import { getAllPostsService } from "./services/getAllPosts.service.js";
import { viewPostService } from "./services/ViewPost.service.js";

const createPost = async (req, res) => {
  try {
    const image = req.file;

    const { eventName, title, date, lastDate, overview } = req.body;

    const post = await createPostService({
      eventName,
      title,
      date,
      lastDate,
      overview,
      image,
    });

    return res.status(201).json({
      success: true,
      message: "Event created successfully",
      post,
    });
  } catch (error) {
    console.error("Create event error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create event",
    });
  }
};

const allPost = async (req, res) => {
  try {
    const posts = await getAllPostsService();

    return res.status(200).json({
      success: true,
      count: posts.length,
      posts,
    });
  } catch (error) {
    console.error("Get all events error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch events",
    });
  }
};

const viewPost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await viewPostService(id);

    return res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    console.error("View event error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch event",
    });
  }
};

const editPost = async (req, res) => {
  try {
    const { id } = req.params;

    const image = req.file;

    const { eventName, title, date, lastDate, overview } = req.body;

    const post = await editPostService(
      id,
      eventName,
      title,
      date,
      lastDate,
      overview,
      image,
    );

    return res.status(200).json({
      success: true,
      message: "Event updated successfully",
      post,
    });
  } catch (error) {
    console.error("Edit event error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update event",
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    await deletePostService(id);

    return res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.error("Delete event error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete event",
    });
  }
};

export { createPost, allPost, viewPost, editPost, deletePost };
