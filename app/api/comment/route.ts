import Comment from "@/database/comment.model";
import Post from "@/database/post.model";
import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        await connectToDatabase();
        const { body, userId, postId } = await req.json();
        const comment = await Comment.create({ body, post: postId, user: userId });

        const isExistPost = await Post.findById(postId);
        if (!isExistPost) {
            return NextResponse.json({ message: "Post not found" }, { status: 500 });
        }

        const post = await Post.findByIdAndUpdate(postId, {
            $push: { comments: comment._id }
        })
        return NextResponse.json(comment);
    } catch (error) {
        const result = error as Error
        return NextResponse.json({ error: result.message }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        await connectToDatabase();

        const { commentId, userId } = await req.json();

        const comment = await Comment.findByIdAndUpdate(commentId, {
            $push: { likes: userId },
        }, { new: true })

        return NextResponse.json(comment);
    } catch (error) {
        const result = error as Error
        return NextResponse.json({ error: result.message }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        await connectToDatabase();

        const { commentId, userId } = await req.json();

        await Comment.findByIdAndUpdate(commentId, {
            $pull: { likes: userId },
        }, { new: true })

        return NextResponse.json({ success: true });
    } catch (error) {
        const result = error as Error
        return NextResponse.json({ error: result.message }, { status: 500 });
    }
}