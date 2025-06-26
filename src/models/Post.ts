import { model, Schema } from "mongoose";

const postSchema = new Schema({
  title: {
    type: String,
  },
  body: {
    type: String,
  },
  image: {
    type: String,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "Author",
  },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
});

const Post = model("Post", postSchema);

export default Post;
