"use client";

import { Ellipsis, Loader2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { IUser } from '@/types';
import { signOut, useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface Props {
    user: IUser
}

const SideBarAccount = ({ user }: Props) => {
    const { data, status }: any = useSession();

    if (status == "loading")
        return (
            <div className="flex items-center justify-center">
                <Loader2 className="animate-spin text-sky-500" />
            </div>
        );
    return (
        <>
            {/* MOBIE SIDEBAR ACCOUNT */}
            <Popover>
                <PopoverTrigger asChild>
                    <Avatar className='flex lg:hidden w-16 h-16 text-center mx-auto'>
                        <AvatarImage src={data?.currentUser?.profileImage} alt="Profile Image" />
                        <AvatarFallback className='bg-slate-800 text-xl'>{data?.currentUser?.name[0]}</AvatarFallback>
                    </Avatar>
                </PopoverTrigger>
                <PopoverContent className="bg-black text-white">
                    <div className='flex flex-col'>
                        <div className='w-full hover:bg-gray-800 cursor-pointer transition duration-200' onClick={() => signOut()}>
                            <div className='w-[90%] mx-auto py-3'>
                                Log out {data?.currentUser?.name}
                            </div>
                        </div>
                    </div>
                </PopoverContent>
            </Popover >

            {/* DESKTOP SIDEBAR ACCOUNT */}
            <Popover>
                <PopoverTrigger asChild>
                    <div className='lg:flex hidden items-center justify-around hover:bg-gray-800 rounded-full w-full relative py-2 cursor-pointer active:bg-gray-600 transition duration-200 '>
                        <Avatar>
                            <AvatarImage src={data?.currentUser?.profileImage} alt="Profile Image" />
                            <AvatarFallback className='bg-slate-800 text-xl'>{data?.currentUser?.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className='flex flex-col'>
                            <h2 className='font-semibold'>{data?.currentUser?.name}</h2>
                            {user?.username ? (
                                <h3 className='text-slate-500 text-sm'>@{data?.currentUser?.username}</h3>
                            ) : (
                                <h3 className='text-slate-500 text-sm'>@Manage account</h3>
                            )}
                        </div>
                        <Ellipsis />
                    </div>
                </PopoverTrigger>
                <PopoverContent className="bg-black text-white w-80">
                    <div className='flex flex-col'>
                        <div className='w-full hover:bg-gray-800 cursor-pointer transition duration-200' onClick={() => signOut()}>
                            <div className='w-[90%] mx-auto py-3'>
                                Log out {data?.currentUser?.name}
                            </div>
                        </div>
                    </div>
                </PopoverContent>
            </Popover >
        </>
    )
}

export default SideBarAccount