import Comment from "@/database/comment.model";
import Post from "@/database/post.model";
import User from "@/database/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { postId: string } }) {
    try {
        await connectToDatabase();
        const { postId } = params

        const isExistPost = await Post.findById(postId);
        if (!isExistPost) {
            return NextResponse.json({ message: "Post not found", status: 404 });
        }

        const post = await Post.findById(postId).populate({
            path: "user",
            model: User,
            select: "name email profileImage _id username",
            options: { sort: { likes: -1 } },
        })
        return NextResponse.json(post);
    } catch (error) {
        const result = error as Error
        return NextResponse.json({ error: result.message }, { status: 500 });
    }
}   