import DepartmentPost from "../../../models/DepartmentPost.js";

const viewPostService = async (id) => {
  const post = await DepartmentPost.findOne({
    postId: id,
  });

  if (!post) {
    throw new Error("Post not found");
  }

  return post;
};

export { viewPostService };
