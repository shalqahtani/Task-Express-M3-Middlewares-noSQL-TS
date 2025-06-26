import Author from "../../models/Author";
import { Request, Response } from "express";

export const getAuthors = async (req: Request, res: Response) => {
  try {
    const authors = await Author.find().populate("posts");
    res.json(authors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching authors" });
  }
};

export const createAuthor = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const author = await Author.create({ name });
    res.json(author);
  } catch (error) {
    res.status(500).json({ message: "Error creating author" });
  }
};
