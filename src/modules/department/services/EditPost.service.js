import DepartmentPost from "../../../models/DepartmentPost.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../../../config/cloudinary.js";

const editPostService = async (
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
  keyDiscussion,
  studentsPresent,
  image,
) => {
  const post = await DepartmentPost.findOne({
    postId: id,
  });

  if (!post) {
    throw new Error("Post not found");
  }

  if (image) {
    if (post.image?.publicId) {
      await deleteFromCloudinary(post.image.publicId);
    }

    const uploaded = await uploadToCloudinary(image, "ieee-department-posts");
    if (uploaded && uploaded.url) {
      post.image = {
        url: uploaded.url,
        publicId: uploaded.publicId,
      };
    }
  }

  // Update post fields
  if (title !== undefined) post.title = title;
  if (category !== undefined) post.category = category;
  if (date !== undefined) post.date = date;
  if (time !== undefined) post.time = time;
  if (venue !== undefined) post.venue = venue;
  if (organizedBy !== undefined) post.organizedBy = organizedBy;
  if (reportAuthor !== undefined) post.reportAuthor = reportAuthor;
  if (overview !== undefined) post.overview = overview;
  if (description !== undefined) post.description = description;
  if (keyDiscussion !== undefined) post.keyDiscussion = keyDiscussion;
  if (studentsPresent !== undefined) post.studentsPresent = studentsPresent;

  await post.save();

  return post;
};

export { editPostService };