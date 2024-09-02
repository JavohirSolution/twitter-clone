"use client";

import { IUser, Post } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction, useState } from "react";
import Button from "../ui/button";
import { toast } from "../ui/use-toast";
import axios from "axios";
import { ToastAction } from "../ui/toast";

interface Props {
    placeholder?: string;
    user?: IUser;
    setPosts: Dispatch<SetStateAction<Post[]>>,
    postId?: string,
    isComment?: boolean,
}

const Form = ({ placeholder, user, setPosts, isComment, postId }: Props) => {
    const [body, setBody] = useState<string>("");
    const [isloading, setIsloading] = useState<boolean>(false);

    const onSubmit = async () => {
        try {
            setIsloading(true);
            if (isComment) {
                const { data } = await axios.post("/api/comment", {
                    body,
                    userId: user?._id,
                    postId,
                });
                const newComment = {
                    ...data,
                    user,
                    likes: 0,
                    hasLiked: false,
                };
                setPosts((prev) => [newComment, ...prev])
                setIsloading(false);
                setBody("")
                toast({
                    title: "Success",
                    description: "Comment created successfully.",
                    action: (
                        <ToastAction altText="Goto schedule to undo" className="bg-white text-black">Undo</ToastAction>
                    ),
                })
            } else {
                const { data } = await axios.post("/api/posts", { body, userId: user?._id });
                const newPost = { ...data, user, likes: 0, hasLiked: false, comments: 0 };
                setPosts((prev) => [newPost, ...prev]);
                setIsloading(false);
                setBody("")
                toast({
                    title: "Success",
                    description: "Post created successfully.",
                    action: (
                        <ToastAction altText="Goto schedule to undo" className="bg-white text-black">Undo</ToastAction>
                    ),
                })
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong. Please try again.",
                variant: "destructive"
            });
            setIsloading(false)
        }
    }

    return (
        <div className="bg-black border-b-[1px] border-neutral-800 w-full px-3 py-2 ">
            <div className="flex flex-row gap-4">
                <Avatar>
                    <AvatarImage src={user?.profileImage} />
                    <AvatarFallback className="bg-slate-800 text-xl">{user?.name[0]}</AvatarFallback>
                </Avatar>

                <div className="w-full">
                    <textarea
                        className="disabled:opacity-80 peer resize-none mt-3 w-full bg-black ring-0 outline-none text-[20px] placeholder-neutral-500 text-white "
                        placeholder={placeholder}
                        disabled={isloading}
                        value={body}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value)}
                        onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) => e.key === "Enter" && onSubmit()}
                    ></textarea>
                    <hr className="opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-800 transition" />

                    <div className="mt-4 flex flex-row justify-end">
                        <Button
                            label={isComment ? "Reply" : "Post"}
                            className="px-6 py-2"
                            disabled={isloading || !body}
                            onClick={onSubmit}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Form