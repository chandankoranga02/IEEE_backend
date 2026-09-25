import express from "express";
import {
  createPost,
  allPost,
  viewPost,
  editPost,
  deletePost,
} from "./controller.js";
import verifyToken from "../../middleware/auth.middleware.js";
import { uploadSingleImage } from "../../config/multer.js";

const router = express.Router();

router.post("/create", verifyToken, uploadSingleImage("image"), createPost);
router.get("/all", allPost);
router.delete("/delete/:id", verifyToken, deletePost);
router.patch("/edit/:id", verifyToken, uploadSingleImage("image"), editPost);
router.get("/post/:id", viewPost);

export default router;
