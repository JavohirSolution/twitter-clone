import { Schema, models, model } from "mongoose";

const userSchema = new Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    coverImage: String,
    profileImage: String,
    bio: String,
    location: String,
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });

const User = models.User || model("User", userSchema);
export default User;