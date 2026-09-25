import DepartmentPost from "../../../models/DepartmentPost.js";
import cloudinary from "../../../config/cloudinary.js";

const deletePostService = async (id) => {
  const post = await DepartmentPost.findOne({
    postId: id,
  });

  if (!post) {
    throw new Error("Post not found");
  }


  if (post.image?.publicId) {
    await cloudinary.uploader.destroy(post.image.publicId);
  }


  await DepartmentPost.deleteOne({
    postId: id,
  });

  return post;
};

export { deletePostService };