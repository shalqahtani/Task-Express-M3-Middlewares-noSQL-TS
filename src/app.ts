import express from "express";
import connectDB from "./database";
import postsRoutes from "./api/posts/posts.routes";


const app = express();
const PORT = 8000;

app.use(express.json());

app.use("/posts", postsRoutes);


connectDB();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});