import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {

    } catch (error) {
        const result = error as Error
        return NextResponse.json({ error: result.message }, { status: 400 })
    }
}