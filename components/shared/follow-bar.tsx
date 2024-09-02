"use client";

import React from 'react';
import { Loader2 } from 'lucide-react';
import FollowUser from './follow-user';
import useUsers from '@/hooks/useUsers';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { IUser } from '@/types';


const FollowBar = () => {
    const { isLoading, data } = useUsers(5);
    const { data: session }: any = useSession();

    return (
        <>
            <div className='py-4 hidden lg:block w-[27%]'>
                <div className='bg-black rounded-xl border overflow-hidden border-slate-700'>
                    <div className='flex items-center p-2'>
                        <h2 className='font-extrabold text-xl'>Who to follow</h2>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center items-center h-24">
                            <Loader2 className="animate-spin text-sky-500" />
                        </div>
                    ) : (
                        <div>
                            {data.map((user: IUser) => (
                                <Link key={user._id} href={`/profile/${user._id}`}>
                                    <FollowUser user={user} />
                                </Link>
                            ))}
                        </div>
                    )}

                    <div className='text-sky-600 lg:flex hidden items-center justify-between hover:bg-gray-900 w-full relative py-3 cursor-pointer active:bg-gray-700/90 transition duration-200 px-3'>
                        Show more
                    </div>
                </div >
            </div >
        </>

    )
}

export default FollowBar