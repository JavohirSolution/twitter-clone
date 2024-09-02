"use client"
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { IUser } from '@/types';
import { sliceText } from '@/lib/utils';


const FollowUser = ({ user }: { user: IUser }) => {

    return (
        <div className='flex flex-col'>
            <div className='lg:flex hidden items-center justify-between hover:bg-gray-900 w-full relative py-2 cursor-pointer active:bg-gray-700/90 transition duration-200 px-3'>
                <div className='flex items-center gap-2'>
                    <Avatar>
                        <AvatarImage src={user?.profileImage} alt="Profile Image" />
                        <AvatarFallback className='bg-slate-800 text-xl'>{user?.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col'>
                        <h2 className='font-semibold flex justify-start hover:underline line-clamp-1'>{user?.name}</h2>
                        {user?.username ? <h2 className="text-slate-600 text-sm line-clamp-1">@{sliceText(user?.username, 16)}</h2> : <h2 className='text-slate-600 text-base line-clamp-1'>@{sliceText(user?.email, 16)}</h2>}
                    </div>
                </div>
                <div className='py-1 rounded-full font-semibold px-4 bg-white text-black'>
                    Follow
                </div>
            </div >
        </div >
    )
}

export default FollowUser