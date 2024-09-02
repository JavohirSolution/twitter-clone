import { Schema, models, model } from "mongoose";

const postSchema = new Schema({
    body: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
}, { timestamps: true });

const Post = models.Post || model("Post", postSchema);
export default Post;