"use client";

import { IUser } from '@/types'
import React, { useState } from 'react'
import Button from '../ui/button'
import { CalendarDays } from 'lucide-react';
import { formatDate, formatDistanceToNowStrict } from 'date-fns';
import { IoLocationSharp } from "react-icons/io5";
import { BiCalendar } from "react-icons/bi";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import EdidModal from '../modals/edit-modal';
import useEditModal from '@/hooks/useEditModal';

const ProfileBio = ({ user, userId }: { user: IUser, userId: string }) => {
    const [isLoading, setisLoading] = useState(false);

    const editModal = useEditModal()
    const router = useRouter()

    const onFollow = async () => {
        try {
            setisLoading(true);
            await axios.put('/api/follows', {
                userId: user?._id,
                currentUserId: userId
            });
            router.refresh();
            setisLoading(false);
        } catch (error) {
            console.log(error);
            setisLoading(false);
        }
    }
    const onUnFollow = async () => {
        try {
            setisLoading(true);
            await axios.delete('/api/follows', {
                data: {
                    userId: user?._id,
                    currentUserId: userId
                }
            });
            router.refresh();
            setisLoading(false);
        } catch (error) {
            console.log(error);
            setisLoading(false);
        }
    }

    return (
        <>
            <EdidModal user={user} />
            <div className='pb-2 border-neutral-800 border-b-[1px]'>
                <div className='flex justify-end p-2'>
                    {user._id === userId ? (
                        <Button
                            label={"Edit profile"}
                            smaller
                            outline
                            onClick={() => editModal.onOpen()}
                        />
                    ) : user.isFollowing ? (
                        <Button label={"Unfollow"} outline smaller onClick={onUnFollow} disabled={isLoading} />
                    ) : (
                        <Button label={"Follow"} secondary smaller onClick={onFollow} disabled={isLoading} />
                    )}
                </div>

                <div className='mt-9 px-4'>
                    <div className="flex flex-col">
                        <p className="text-white font-semibold text-2xl">
                            {user?.name}
                        </p>
                    </div>
                    <p className='text-md text-neutral-500'>
                        {user.username ? `@${user.username}` : user.email}
                    </p>

                    <div className="flex flex-col mt-2">
                        <p className="text-white">{user.bio}</p>
                        <div className="flex gap-4 items-center">
                            {user.location && (
                                <div className="flex flex-row items-center gap-2 mt-4 text-sky-500">
                                    <IoLocationSharp size={24} />
                                    <p>{user.location}</p>
                                </div>
                            )}

                            <div className='flex items-center mt-5 gap-1 font-medium'>
                                <CalendarDays className='text-neutral-500' />
                                <p className='text-neutral-500 text-md'>Joined</p>
                                <p className='text-neutral-500  text-md'>{formatDate(new Date(user.createdAt), 'MMMM yyyy')}</p>
                            </div>
                        </div>

                        <div className="flex flex-row items-center mt-2 gap-6">
                            <div
                                className="flex flex-row items-center gap-1 hover:underline cursor-pointer"
                            // onClick={openFollowModal}
                            >
                                <p className="text-white">{user.following}</p>
                                <p className="text-neutral-500">Following</p>
                            </div>

                            <div
                                className="flex flex-row items-center gap-1 hover:underline cursor-pointer"
                            // onClick={openFollowModal}
                            >
                                <p className="text-white">{user.followers}</p>
                                <p className="text-neutral-500">Followers</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileBio