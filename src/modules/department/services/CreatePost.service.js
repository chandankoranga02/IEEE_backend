import DepartmentPost from "../../../models/DepartmentPost.js";
import { uploadToCloudinary } from "../../../config/cloudinary.js";
import generatePostId from "../../../utils/GeneratePostId.js";

const createPostService = async ({
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
  image,
  branch,
}) => {
  let postId;
  let attempts = 0;
  const MAX_ATTEMPTS = 10;

  while (attempts < MAX_ATTEMPTS) {
    const generatedId = await generatePostId(branch, date);

    const existingPost = await DepartmentPost.findOne({
      postId: generatedId,
    });

    if (!existingPost) {
      postId = generatedId;
      break;
    }

    attempts++;
  }

  if (!postId) {
    throw new Error("Unable to generate a unique post ID");
  }

  let imageData = { url: "", publicId: "" };

  if (image) {
    const uploaded = await uploadToCloudinary(image, "ieee-department-posts");
    if (uploaded && uploaded.url) {
      imageData = uploaded;
    }
  }

  const post = await DepartmentPost.create({
    id: postId,
    postId,
    title,
    category,
    branch,
    date,
    time,
    venue,
    organizedBy,
    reportAuthor,
    overview,
    description,
    keyDiscussion,
    studentsPresent,
    image: imageData,
  });

  return post;
};

export { createPostService };
