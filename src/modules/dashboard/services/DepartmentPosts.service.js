import Post from "../../../models/DepartmentPost.js";

const departmentPostsService = async () => {
  const result = await Post.aggregate([
    {
      $match: {
        branch: {
          $in: ["CSE", "AIML", "EE", "ECE", "BT"],
        },
      },
    },
    {
      $group: {
        _id: "$branch",
        count: { $sum: 1 },
      },
    },
  ]);

  const counts = {
    CSE: 0,
    AIML: 0,
    EE: 0,
    ECE: 0,
    BT: 0,
  };

  result.forEach((item) => {
    counts[item._id] = item.count;
  });

  return counts;
};

 export default departmentPostsService ;
