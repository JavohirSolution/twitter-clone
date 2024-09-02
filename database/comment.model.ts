import { Schema, models, model } from "mongoose";

const commentSchema = new Schema({
    body: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post"
    },
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
}, { timestamps: true });

const Comment = models.Comment || model("Comment", commentSchema);
export default Comment;