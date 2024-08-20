import User from "@/database/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { compare } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        await connectToDatabase();
        const { email, password } = await req.json();
        const isExistUserUser = await User.findOne({ email });
        if (!isExistUserUser) {
            return NextResponse.json(
                { error: "User does not exists" },
                { status: 400 }
            );
        };

        const isPasswordvalid = await compare(password, isExistUserUser.password);
        if (!isPasswordvalid) {
            return NextResponse.json(
                { error: "Password is not correct" },
                { status: 400 }
            );
        }
        return NextResponse.json({ success: true, isExistUserUser });
    } catch (error) {
        const result = error as Error
        return NextResponse.json({ error: result.message }, { status: 500 });
    }
}