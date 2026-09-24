import DepartmentPost from "../models/DepartmentPost.js";

const generatePostId = async (department, date) => {
  const yearMatch = date.match(/\d{4}/);

  if (!yearMatch) {
    throw new Error("Invalid date format");
  }

  const year = yearMatch[0].slice(-2);
  
  const lastPost = await DepartmentPost.findOne({
    branch: department,
    postId: new RegExp(`^${department}${year}\\d{3}$`),
  }).sort({ postId: -1 });

  let serial = 1;

  if (lastPost) {
    const lastSerial = parseInt(lastPost.postId.slice(-3), 10);
    serial = lastSerial + 1;
  }

  if (serial > 999) {
    throw new Error(`Post limit reached for ${department} in ${year}`);
  }

  const formattedSerial = serial.toString().padStart(3, "0");

  return `${department}${year}${formattedSerial}`;
};

export default generatePostId;