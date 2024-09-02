"use client";

import CommentItem from '@/components/shared/comment-item';
import Form from '@/components/shared/form';
import Header from '@/components/shared/header'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { sliceText } from '@/lib/utils';
import { Post } from '@/types';
import axios from 'axios';
import { formatDistanceToNowStrict } from 'date-fns';
import { Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

const Page = ({ params }: { params: { postId: string } }) => {
    const { data: session, status }: any = useSession();
    const [isloading, setIsloading] = useState<boolean>(false);
    const [isFetchingComment, setIsFetchingComment] = useState<boolean>(false);
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Post[]>([]);

    const getPosts = async () => {
        try {
            setIsloading(true)
            const { data } = await axios.get(`/api/posts/${params.postId}`);
            setPost(data)
            setIsloading(false)
        } catch (error: any) {
            setIsloading(false)
        } finally {
            setIsloading(false)
        }
    }

    const getPostComments = async () => {
        try {
            setIsFetchingComment(true)
            const { data } = await axios.get(`/api/posts/${params.postId}/comments`);
            setComments(data)
            setIsFetchingComment(false)
        } catch (error) {
            setIsFetchingComment(false)
        }
    }

    useEffect(() => {
        getPosts()
        getPostComments()
    }, [])

    return (
        <>
            <Header label='Post' isBack />

            {isloading || status === "loading" ? (
                <div className="flex justify-center items-center h-24">
                    <Loader2 className="animate-spin text-sky-500" />
                </div>
            ) : (
                <>
                    <div className="border-b-[1px] border-neutral-800 p-5 cursor-pointer bg-neutral-900 transition">
                        <div className="flex flex-row items-center gap-3">
                            <Avatar>
                                <AvatarImage src={post?.user?.profileImage} />
                                <AvatarFallback className='bg-slate-800 text-xl'>{post?.user?.name[0]} </AvatarFallback>
                            </Avatar>

                            <div>
                                <div className="flex flex-row items-center gap-2">
                                    <p className="text-white font-semibold cursor-pointer hover:underline">
                                        {post?.user.name}
                                    </p>
                                    <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
                                        {post && post?.user.username
                                            ? `@${sliceText(post.user.username, 20)}`
                                            : post && sliceText(post.user.email, 20)}
                                    </span>
                                    <span className="text-neutral-500 text-sm">
                                        {post &&
                                            post.createdAt &&
                                            formatDistanceToNowStrict(new Date(post.createdAt || new Date()))}
                                    </span>
                                </div>
                                <div className="text-white mt-1">{post?.body}</div>
                            </div>
                        </div>
                    </div>

                    <Form
                        placeholder="Post your reply?"
                        user={JSON.parse(JSON.stringify(session?.currentUser))}
                        setPosts={setComments}
                        postId={params.postId}
                        isComment
                    />

                    {isFetchingComment ? (
                        <div className="flex justify-center items-center h-24">
                            <Loader2 className="animate-spin text-sky-500" />
                        </div>
                    ) : (
                        comments.map((comment) => (
                            <CommentItem
                                comment={comment}
                                key={comment._id}
                                user={JSON.parse(JSON.stringify(session.currentUser))}
                                setComments={setComments}
                                comments={comments}
                            />
                        ))
                    )}
                </>
            )}
        </>
    )
}

export default Page