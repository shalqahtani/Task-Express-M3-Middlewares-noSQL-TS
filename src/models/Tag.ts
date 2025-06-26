import { model, Schema } from "mongoose";

const tagSchema = new Schema({
  name: {
    type: String,
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

const Tag = model("Tag", tagSchema);

export default Tag;
