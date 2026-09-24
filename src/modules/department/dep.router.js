import express from "express";
import {
  createpost,
  allPost,
  DeletePost,
  EditPost,
  getPost,
} from "./controller.js";

const router = express.Router();

router.post("/create", createpost);
router.get("/all", allPost);
router.delete("/delete/:id", DeletePost);
router.post("/edit/:id", EditPost);
router.get("/post/:id", getPost);

export default router;
