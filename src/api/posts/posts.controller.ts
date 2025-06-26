import Author from "../../models/Author";
import Post from "../../models/Post";
import { Request, Response } from "express";

export const getPosts = async (req: Request, res: Response) => {
  try {
    //const posts = await Post.find().populate("tags");
    const posts = await Post.find().populate("author").populate("tags");

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, body, authorId } = req.body;
    const image = req.file ? req.file.path : null;

    const post = await Post.create({ title, body, image, author: authorId });

    await Author.findByIdAndUpdate(authorId, { $push: { posts: post._id } });
    const fetchedPost = await Post.findById(post._id).populate("author");

    res.status(201).json(fetchedPost);
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const foundPost = await Post.findById(id);
    if (!foundPost) {
      res.status(404).json({ message: "Post not found" });
    } else {
      await foundPost.updateOne(req.body);
      res.json({ message: "Post updated successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating post" });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post" });
  }
};
