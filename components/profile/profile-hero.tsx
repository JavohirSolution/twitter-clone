import { IUser } from '@/types'
import Image from 'next/image'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const ProfileHero = ({ user }: { user: IUser }) => {
    return (
        <div className='h-44 relative bg-neutral-500'>
            {user?.coverImage && (
                <Image
                    fill
                    src={user.coverImage}
                    alt={user.name}
                    style={{ objectFit: "cover" }}
                />
            )}

            <div className="absolute top-[120px] left-4">
                <Avatar className='w-32 h-32 ring-4 ring-black bg-black'>
                    <AvatarImage src={user?.profileImage} alt="Profile Image" />
                    <AvatarFallback className='bg-slate-800 text-5xl'>{user?.name[0]}</AvatarFallback>
                </Avatar>
            </div>
        </div>
    )
}

export default ProfileHero