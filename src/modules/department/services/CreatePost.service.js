import DepartmentPost from "../../../models/DepartmentPost.js";
import cloudinary from "../../../config/cloudinary.js";
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
    const result = await cloudinary.uploader.upload(image.path, {
      folder: "ieee-department-posts",
    });

    imageData = {
      url: result.secure_url,
      publicId: result.public_id,
    };
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
