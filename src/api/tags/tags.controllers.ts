import Post from "../../models/Post";
import Tag from "../../models/Tag";
import { NextFunction, Request, Response } from "express";

export const getTags = async (req: Request, res: Response) => {
  try {
    const tags = await Tag.find().populate("posts");
    res.json(tags);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Tags" });
  }
};
export const createTag = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const tag = await Tag.create({ name });
    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json({ message: "Failed to create tag" });
  }
};

export const linkPostandTag = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId, tagId } = req.params;
    try {
      const post = await Post.findById(postId);
      if (post) {
        const tagObj = await Tag.findById(tagId);
        if (tagObj) {
          post.tags.push(tagObj._id);
          await post.save();
        }
        // Also update each Tag with this post
        await Tag.updateMany(
          { _id: { $in: tagId } },
          { $addToSet: { posts: post._id } }
        );
        // const tag = await Post.findById(postId).populate("tags");
        // res.status(200).json(tag);
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post not found" });
      }
    } catch (error) {
      next(error);
    }
    // await Post.findByIdAndUpdate(postId);
    // await Tag.findByIdAndUpdate(tagId);
    // const tag = await Post.findById(postId).populate("tags");
    // res.status(200).json(tag);
  } catch (error) {
    res.status(500).json({ message: "Failed to associate tag with post" });
  }
};
