"use client";

import { useSession } from "next-auth/react"
import Header from "@/components/shared/header";
import Form from "@/components/shared/form";
import { Post } from "@/types";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import axios from "axios";
import PostItem from "@/components/shared/post-item";

export default function Home() {
    const { data: session, status }: any = useSession();
    const [isloading, setIsloading] = useState<boolean>(false);
    const [posts, setPosts] = useState<Post[]>([])

    useEffect(() => {
        const getPosts = async () => {
            try {
                setIsloading(true)
                const { data } = await axios.get("/api/posts?limit=10");
                setPosts(data)
                setIsloading(false)
            } catch (error) {
                setIsloading(false)
            }
        }
        getPosts()
    }, [])

    return (
        <>
            <Header label="Home" />
            {isloading || status === "loading" ? (
                <div className="flex justify-center items-center h-24">
                    <Loader2 className="animate-spin text-sky-500" />
                </div>
            ) : (
                <>
                    <Form
                        placeholder="What is happening?!"
                        user={JSON.parse(JSON.stringify(session?.currentUser))}
                        setPosts={setPosts}
                    />
                    {posts.map((post) => (
                        <PostItem
                            key={post._id}
                            post={post}
                            user={JSON.parse(JSON.stringify(session?.currentUser))}
                            setPosts={setPosts}
                        />
                    ))}
                </>
            )}
        </>
    );
}
