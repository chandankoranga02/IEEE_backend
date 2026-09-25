import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a file (buffer, local path, base64 string, or pre-uploaded Cloudinary file) to Cloudinary.
 * @param {Object|string} file - Multer file object, local path, or base64 string.
 * @param {string} folder - Cloudinary folder name.
 * @returns {Promise<{url: string, publicId: string}>}
 */
export const uploadToCloudinary = (file, folder = "ieee-general") => {
  return new Promise((resolve, reject) => {
    if (!file) {
      return resolve({ url: "", publicId: "" });
    }

    // 1. If file has already been uploaded by multer-storage-cloudinary
    if (file.path && typeof file.path === "string" && file.path.startsWith("http")) {
      return resolve({
        url: file.path,
        publicId: file.filename || file.public_id || "",
      });
    }

    // 2. If file is a multer memoryStorage buffer
    if (file.buffer) {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: "auto",
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary buffer upload error:", error);
            return reject(error);
          }
          return resolve({
            url: result.secure_url,
            publicId: result.public_id,
          });
        }
      );
      uploadStream.end(file.buffer);
      return;
    }

    // 3. If file has a local disk path (e.g. diskStorage or temporary file)
    if (file.path && typeof file.path === "string") {
      cloudinary.uploader.upload(
        file.path,
        {
          folder,
          resource_type: "auto",
        },
        (error, result) => {
          // Clean up local file if exists
          try {
            if (fs.existsSync(file.path)) {
              fs.unlinkSync(file.path);
            }
          } catch (unlinkErr) {
            console.warn("Could not remove temp file:", unlinkErr.message);
          }

          if (error) {
            console.error("Cloudinary file path upload error:", error);
            return reject(error);
          }
          return resolve({
            url: result.secure_url,
            publicId: result.public_id,
          });
        }
      );
      return;
    }

    // 4. If file is a raw string (e.g. base64 data URI or remote image URL)
    if (typeof file === "string" && file.trim().length > 0) {
      cloudinary.uploader.upload(
        file,
        {
          folder,
          resource_type: "auto",
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary string upload error:", error);
            return reject(error);
          }
          return resolve({
            url: result.secure_url,
            publicId: result.public_id,
          });
        }
      );
      return;
    }

    // Default fallback
    return resolve({ url: "", publicId: "" });
  });
};

/**
 * Deletes an asset from Cloudinary using its public ID.
 * @param {string} publicId - Cloudinary public ID.
 * @returns {Promise<any>}
 */
export const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return;
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("Cloudinary delete error:", error.message);
  }
};

export default cloudinary;