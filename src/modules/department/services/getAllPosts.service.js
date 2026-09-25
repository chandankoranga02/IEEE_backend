import DepartmentPost from "../../../models/DepartmentPost.js";

const getAllPostsService = async (dep) => {
  const query = dep ? { branch: dep } : {};
  const posts = await DepartmentPost.find(query).sort({ createdAt: -1 });
  return posts;
};

export { getAllPostsService };