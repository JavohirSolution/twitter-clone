"use client";

import { IUser, Post } from "@/types";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import PostItem from "./post-item";

interface Props {
    userId: string;
    user: IUser;
}

const PostFeed = ({ userId, user }: Props) => {
    const [isLoading, setisLoading] = useState<boolean>(false);
    const [posts, setPosts] = useState<Post[]>([]);

    const getPosts = async () => {
        try {
            setisLoading(true)
            const { data } = await axios.get(`/api/users/posts/${userId}`);
            setPosts(data)
            setisLoading(false)
        } catch (error) {
            console.log(error);
            setisLoading(false)
        }
    }

    useEffect(() => {
        getPosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId])

    return (
        <>
            {isLoading ? (
                <div className="flex justify-center items-center h-24">
                    <Loader2 className="animate-spin text-sky-500" />
                </div>
            ) : (
                posts.map((post) => (
                    <PostItem
                        key={post._id}
                        post={post}
                        user={user}
                        setPosts={setPosts}
                    />
                ))
            )}
        </>

    )
}

export default PostFeed