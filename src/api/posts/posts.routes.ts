import express from "express";
import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from "./posts.controller";
import { upload } from "../../middlewares/multer.middleware";

const router = express.Router();

router.get("/posts", getPosts);
router.post("/posts", upload.single("image"), createPost);
router.put("/posts/:id", updatePost);
router.delete("/posts/:id", deletePost);

export default router;
