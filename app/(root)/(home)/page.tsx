"use client";

import Auth from "@/components/auth";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react"


export default function Home() {
    const { data: session } = useSession()
    console.log(session);
    return (
        <>
            <div>
                <h1 className="text-white text-2xl">Hello world</h1>
                <button onClick={() => signOut()} className="px-4 py-2 bg-red-700 text-white">Sign Out</button>
            </div>
        </>
    );
}
