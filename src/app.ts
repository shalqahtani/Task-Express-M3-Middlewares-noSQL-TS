import express from "express";
import connectDB from "./database";
import postsRoutes from "./api/posts/posts.routes";
import authorsRoutes from "./api/authors/authors.routes";
import tagsRoutes from "./api/tags/tags.routes";
import { notFound } from "./middlewares/notFound.middleware";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import morgan from "morgan";
import cors from "cors";
const app = express();
const PORT = 8000;

app.use(express.json());

app.use("/", postsRoutes);
app.use("/", authorsRoutes);
app.use("/", tagsRoutes);

app.use(notFound);
app.use(morgan("dev"));
app.use(cors());
app.use(errorHandler);
import path from "path";
app.use("/media", express.static(path.join(__dirname, "../media")));
connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
