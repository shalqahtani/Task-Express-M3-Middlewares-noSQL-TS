import express from "express";
import { createAuthor, getAuthors } from "./authors.controllers";
import { upload } from "../../middlewares/multer.middleware";

const router = express.Router();

router.get("/authors", getAuthors);
router.post("/authors", createAuthor);
export default router;
