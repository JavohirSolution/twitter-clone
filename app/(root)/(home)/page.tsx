"use client";

import Auth from "@/components/auth";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react"


export default function Home() {
    const { data: session } = useSession()
    return (
        <>
            <div>
                <h1 className="text-white text-2xl">Hello world</h1>
            </div>
        </>
    );
}
