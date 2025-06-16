import { model, Schema } from "mongoose";

const postSchema = new Schema({
    title: {
        type: String,
    },
    body: {
        type: String,
    },

});

const Post = model("Post", postSchema);

export default Post;