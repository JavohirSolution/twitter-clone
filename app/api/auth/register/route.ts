import User from "@/database/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        await connectToDatabase();

        const { searchParams } = new URL(req.url);
        const step = searchParams.get("step");

        if (step === "1") {
            const { email } = await req.json();
            const isExistUser = await User.findOne({ email });
            if (isExistUser) {
                return NextResponse.json(
                    { error: "Email already exists" },
                    { status: 400 }
                );
            };

            return NextResponse.json({ success: true })
        } else if (step === "2") {
            const { email, password, username, name } = await req.json();
            const isExistUserName = await User.findOne({ username });
            if (isExistUserName) {
                return NextResponse.json(
                    { error: "Username already exists" },
                    { status: 400 }
                );
            };

            const hashedPassword = await hash(password, 10);
            const user = await User.create({
                email,
                password: hashedPassword,
                username,
                name
            })
            return NextResponse.json({ success: true, user });
        }

        // const { email, password, username, name } = await req.json();
        // const user = await User.create({ email, password, username, name });
    } catch (error) {
        const result = error as Error
        return NextResponse.json({ error: result.message }, { status: 500 });
    }
}