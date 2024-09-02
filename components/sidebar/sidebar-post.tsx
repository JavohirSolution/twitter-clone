import { Feather } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const SideBarPost = () => {
    return (
        <>
            <Link href={"/"} className='w-full' >
                {/* MOBILE VERSION */}
                <div className='w-fit flex lg:hidden bg-sky-500 p-6 mx-auto items-center justify-center rounded-full hover:opacity-90 cursor-pointer'>
                    <button><Feather /></button>
                </div>

                {/* DESKTOP VERSION */}
                <div className='mt-8 hidden items-center justify-center w-full bg-sky-500 p-4 rounded-full hover:opacity-90 lg:flex'>
                    <button className='text-lg font-bold'>Post</button>
                </div>
            </Link>
        </>
    )
}

export default SideBarPost