import express from "express";
import {
  createPost,
  allPost,
  viewPost,
  editPost,
  deletePost,
} from "./dep.controller.js";

const router = express.Router();

router.post("/create", createPost);
router.get("/all", allPost);
router.delete("/delete/:id", deletePost);
router.post("/edit/:id", editPost);
router.get("/post/:id", viewPost);

export default router;
