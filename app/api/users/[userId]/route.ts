import User from "@/database/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: { userId: string } }) {
    try {
        await connectToDatabase();
        const body = await req.json();
        const { userId } = params;

        await User.findByIdAndUpdate(userId, body, { new: true });

        return NextResponse.json({ message: "User updated successfully" })
    } catch (error) {
        const result = error as Error;
        return NextResponse.json({ error: result.message }, { status: 400 });
    }
}