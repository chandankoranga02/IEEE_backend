import DepartmentPost from "../../../models/DepartmentPost";

const getAllPostsService = async (dep) => {
  const posts = await DepartmentPost.find({branch: dep}).sort({ createdAt: -1 });
  return posts;
};

export { getAllPostsService };