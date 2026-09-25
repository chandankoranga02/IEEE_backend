import { createPostService } from "./services/CreatePost.service.js";
import { deletePostService } from "./services/deletePost.service.js";
import { editPostService } from "./services/EditPost.service.js";
import { getAllPostsService } from "./services/getAllPosts.service.js";
import { viewPostService } from "./services/ViewPost.service.js";

const parseArrayField = (field) => {
  if (!field) return [];
  if (Array.isArray(field)) return field;
  if (typeof field === "string") {
    const trimmed = field.trim();
    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) return parsed.map((s) => String(s).trim());
      } catch (e) {
        // fallback
      }
    }
    return trimmed
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
};

const createPost = async (req, res) => {
  try {
    const image = req.file;
    const {
      title,
      category,
      date,
      time,
      venue,
      organizedBy,
      reportAuthor,
      overview,
      description,
      keyDiscussion,
      studentsPresent,
      branch,
    } = req.body;

    const { dep } = req.query;

    const post = await createPostService({
      title,
      category,
      date,
      time,
      venue,
      organizedBy,
      reportAuthor,
      overview,
      description,
      keyDiscussion: parseArrayField(keyDiscussion),
      studentsPresent: parseArrayField(studentsPresent),
      image,
      branch: dep || branch,
    });

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    console.error("Create post error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create post",
    });
  }
};

const allPost = async (req, res) => {
  try {
    const { dep } = req.query;

    const posts = await getAllPostsService(dep);

    return res.status(200).json({
      success: true,
      count: posts.length,
      posts,
    });
  } catch (error) {
    console.error("Get all posts error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch posts",
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
    console.error("View post error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch post",
    });
  }
};

const editPost = async (req, res) => {
  try {
    const { id } = req.params;
    const image = req.file;
    const {
      title,
      category,
      date,
      time,
      venue,
      organizedBy,
      reportAuthor,
      overview,
      description,
      keyDiscussion,
      studentsPresent,
    } = req.body;

    const post = await editPostService(
      id,
      title,
      category,
      date,
      time,
      venue,
      organizedBy,
      reportAuthor,
      overview,
      description,
      keyDiscussion !== undefined ? parseArrayField(keyDiscussion) : undefined,
      studentsPresent !== undefined ? parseArrayField(studentsPresent) : undefined,
      image,
    );

    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
      post,
    });
  } catch (error) {
    console.error("Edit post error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update post",
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    await deletePostService(id);

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error("Delete post error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete post",
    });
  }
};

export { createPost, allPost, viewPost, editPost, deletePost };
