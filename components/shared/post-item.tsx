"use client";

import { IUser, Post } from '@/types'
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { sliceText } from '@/lib/utils'
import { MessageCircle, Heart, Trash2, Loader2 } from 'lucide-react'
import { formatDistanceToNowStrict } from 'date-fns'
import { toast } from '../ui/use-toast'
import axios from 'axios'
import { ToastAction } from '../ui/toast'
import { FcLike } from "react-icons/fc";
import { useRouter } from 'next/navigation';


interface Props {
    post: Post;
    user: IUser;
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

const PostItem = ({ post, user, setPosts }: Props) => {
    const [isloading, setIsloading] = useState(false);
    const router = useRouter();

    const onDelete = async (e: any) => {
        e.stopPropagation()
        try {
            setIsloading(true)
            await axios.delete("/api/posts", {
                data: {
                    postId: post._id
                }
            });
            setPosts((prev) => prev.filter((p) => p._id !== post._id));
            setIsloading(false)
            toast({
                title: "Success",
                description: "Post deleted successfully.",
                action: (
                    <ToastAction altText="Goto schedule to undo" className="bg-white text-black">Undo</ToastAction>
                ),
            })
        } catch (error) {
            setIsloading(false)
            toast({
                title: "Error",
                description: "Something went wrong. Please try again.",
                variant: "destructive"
            });
        }
    }

    const onLike = async (e: any) => {
        e.stopPropagation()
        try {
            setIsloading(true)
            if (post.hasLiked) {
                const { data } = await axios.delete("/api/likes", {
                    data: {
                        postId: post._id,
                        userId: user._id
                    }
                })

                const updatedPost = {
                    ...post,
                    hasLiked: false,
                    likes: post.likes - 1
                };

                setPosts((prev) => (
                    prev.map((p) => p._id === post._id ? updatedPost : p)
                ));
            } else {
                const { data } = await axios.put("/api/likes", {
                    postId: post._id,
                    userId: user._id
                })

                const updatedPost = {
                    ...post,
                    hasLiked: true,
                    likes: post.likes + 1
                };

                setPosts((prev) => (
                    prev.map((p) => p._id === post._id ? updatedPost : p)
                ));
            }
            setIsloading(false)
        } catch (error) {
            setIsloading(false)
            toast({
                title: "Error",
                description: "Something went wrong. Please try again.",
                variant: "destructive"
            });
        }
    }

    const goToPost = () => {
        router.push(`/posts/${post._id}`)
    }

    return (
        <div className='border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition relative'>
            {isloading && (
                <div className="absolute inset-0 w-full h-full bg-black opacity-50">
                    <div className="flex justify-center items-center h-full">
                        <Loader2 className="animate-spin text-sky-500" />
                    </div>
                </div>
            )}
            <div className='flex flex-row gap-x-3 items-center' onClick={goToPost}>
                <div>
                    <Avatar>
                        <AvatarImage src={post.user.profileImage} />
                        <AvatarFallback className='bg-slate-800 text-xl'>{post.user.name[0]}</AvatarFallback>
                    </Avatar>
                </div>

                <div className='flex flex-col gap-y-1'>
                    <div className='flex flex-row items-center gap-2'>
                        <p className='cursor-pointer text-white font-semibold hover:underline'>
                            {post.user.name}
                        </p>
                        <span className=''>
                            {post.user.username ? <h2 className="text-neutral-600 text-sm line-clamp-1">@{sliceText(post.user.username, 16)}</h2> : <h2 className='text-neutral-600 text-base line-clamp-1'>@{sliceText(post.user.email, 16)}</h2>}
                        </span>
                        <p className='text-neutral-600 text-md'>
                            {formatDistanceToNowStrict(new Date(post.createdAt || new Date()))}
                        </p>
                    </div>

                    <div className="text-white font-serif text-xl">{post.body}</div>

                    <div className='flex flex-row items-center mt-3 gap-10'>
                        <div className='flex items-center text-neutral-500 hover:text-sky-600 cursor-pointer w-20'>
                            <div className='w-10 h-10 rounded-full hover:bg-sky-700/20 flex items-center justify-center'>
                                <MessageCircle />
                            </div>
                            {post?.comments || 0}
                        </div>
                        <div className='flex items-center text-neutral-500 hover:text-pink-600 cursor-pointer w-20'>
                            <div className='w-10 h-10 rounded-full hover:bg-pink-700/20 flex items-center justify-center '>
                                {post?.hasLiked ? <FcLike className='text-3xl' onClick={onLike} /> : <Heart onClick={onLike} />}
                            </div>
                            {post?.likes || 0}
                        </div>
                        {post?.user?._id === user?._id && (
                            <div className='flex items-center text-neutral-500 hover:text-red-600 cursor-pointer w-20'>
                                <div className='w-10 h-10 rounded-full hover:bg-red-700/20 flex items-center justify-center '>
                                    <Trash2 onClick={onDelete} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>

        </div>
    )
}

export default PostItem