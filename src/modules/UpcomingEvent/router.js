import express from "express";
import {
  createPost,
  allPost,
  viewPost,
  editPost,
  deletePost,
} from "./controller.js";

const router = express.Router();

router.post("/create", createPost);
router.get("/all", allPost);
router.delete("/delete/:id", deletePost);
router.patch("/edit/:id", editPost);
router.get("/post/:id", viewPost);

export default router;
