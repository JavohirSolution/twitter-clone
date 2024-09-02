import { IUser, Post } from '@/types'
import { MessageCircle, Heart, Trash2, Loader2 } from 'lucide-react'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { sliceText } from '@/lib/utils';
import { formatDistanceToNowStrict } from 'date-fns';
import { FcLike } from "react-icons/fc";
import { useRouter } from 'next/navigation';
import { toast } from '../ui/use-toast';
import axios from 'axios';

interface Props {
    comment: Post,
    user: IUser,
    setComments: Dispatch<SetStateAction<Post[]>>,
    comments: Post[]
}

const CommentItem = ({ comment, user, setComments, comments }: Props) => {
    const [isLoading, setIsLoading] = useState(false);

    const onLike = async (e: any) => {
        e.stopPropagation()
        try {
            setIsLoading(true)
            if (comment.hasLiked) {
                const { data } = await axios.delete("/api/comment", {
                    data: {
                        commentId: comment._id,
                        userId: user._id
                    }
                })

                const updatedComments = comments.map((c) => {
                    if (c._id === comment._id) {
                        return {
                            ...c,
                            hasLiked: false,
                            likes: c.likes - 1,
                        };
                    }
                    return c;
                });
                setComments(updatedComments);
            } else {
                const { data } = await axios.put("/api/comment", {
                    commentId: comment._id,
                    userId: user._id
                });

                const updatedComments = comments.map((c) => {
                    if (c._id === comment._id) {
                        return {
                            ...c,
                            hasLiked: true,
                            likes: c.likes + 1,
                        };
                    }
                    return c;
                });
                setComments(updatedComments);
            }
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            toast({
                title: "Error",
                description: "Something went wrong. Please try again.",
                variant: "destructive"
            });
        }
    }

    const onDelete = async () => {
        try {
            setIsLoading(true);
            await axios.delete(`/api/comment/${comment._id}`);
            setComments((prev) => prev.filter((c) => c._id !== comment._id));
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    return (
        <div className="border-b-[1px] relative border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
            {isLoading && (
                <div className="absolute inset-0 w-full h-full bg-black opacity-50">
                    <div className="flex justify-center items-center h-full">
                        <Loader2 className="animate-spin text-sky-500" />
                    </div>
                </div>
            )}
            <div className="flex flex-row items-center gap-3">
                <Avatar>
                    <AvatarImage src={comment?.user.profileImage} />
                    <AvatarFallback>{comment?.user.name[0]}</AvatarFallback>
                </Avatar>

                <div>
                    <div
                        className="flex flex-row items-center gap-2"
                    >
                        <p className="text-white font-semibold cursor-pointer hover:underline">
                            {comment?.user.name}
                        </p>
                        <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
                            {comment && comment?.user.username
                                ? `@${sliceText(comment.user.username, 20)}`
                                : comment && sliceText(comment.user.email, 20)}
                        </span>
                        <span className="text-neutral-500 text-sm">
                            {comment &&
                                comment.createdAt &&
                                formatDistanceToNowStrict(new Date(comment.createdAt || new Date()))}
                        </span>
                    </div>
                    <div className="text-white mt-1">{comment?.body}</div>

                    <div className="flex flex-row items-center mt-3 gap-10">
                        <div
                            className={`flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500`}
                        >
                            {/* {comment?.hasLiked ? <FcLike className='text-3xl' /> : <Heart />} */}
                            {comment?.hasLiked ? <FcLike className='text-3xl' onClick={onLike} /> : <Heart onClick={onLike} />}
                            <p>{comment.likes || 0}</p>
                        </div>

                        {comment?.user?._id === user?._id && (
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
    );
}

export default CommentItem