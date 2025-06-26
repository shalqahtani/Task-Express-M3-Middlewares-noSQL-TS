import express from "express";
import { createTag, getTags, linkPostandTag } from "./tags.controllers";

const router = express.Router();

router.get("/tags", getTags);
router.post("/tags", createTag);
router.post("/posttag/:postId/:tagId", linkPostandTag);
export default router;
