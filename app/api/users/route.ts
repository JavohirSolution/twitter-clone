import User from "@/database/user.model";
import { authOption } from "@/lib/auth-options";
import { connectToDatabase } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        await connectToDatabase();

        const { currentUser }: any = await getServerSession(authOption);

        const { searchParams } = new URL(req.url);
        const limit = searchParams.get("limit");

        const users = await User.find({})
            .select("name username _id profileImage email")
            .limit(Number(limit));

        const filteredUser = users.filter(user => (
            user._id.toString() !== currentUser._id.toString()
        ))

        return NextResponse.json(filteredUser)
    } catch (error) {
        const result = error as Error
        return NextResponse.json({ error: result.message }, { status: 500 });
    }
}