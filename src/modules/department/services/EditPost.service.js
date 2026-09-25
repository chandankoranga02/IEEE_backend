import DepartmentPost from "../../../models/DepartmentPost.js";
import cloudinary from "../../../config/cloudinary.js";

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
      await cloudinary.uploader.destroy(post.image.publicId);
    }

    // Upload new image
    const result = await cloudinary.uploader.upload(image.path, {
      folder: "ieee-department-posts",
    });

    post.image = {
      url: result.secure_url,
      publicId: result.public_id,
    };
  }

  // Update post fields
  post.title = title;
  post.category = category;
  post.date = date;
  post.time = time;
  post.venue = venue;
  post.organizedBy = organizedBy;
  post.reportAuthor = reportAuthor;
  post.overview = overview;
  post.description = description;
  post.keyDiscussion = keyDiscussion;
  post.studentsPresent = studentsPresent;

  await post.save();

  return post;
};

export { editPostService };