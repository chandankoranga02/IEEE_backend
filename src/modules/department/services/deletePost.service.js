import DepartmentPost from "../../../models/DepartmentPost.js";
import { deleteFromCloudinary } from "../../../config/cloudinary.js";

const deletePostService = async (id) => {
  const post = await DepartmentPost.findOne({
    postId: id,
  });

  if (!post) {
    throw new Error("Post not found");
  }


  if (post.image?.publicId) {
    await deleteFromCloudinary(post.image.publicId);
  }


  await DepartmentPost.deleteOne({
    postId: id,
  });

  return post;
};

export { deletePostService };