"use client";

import { Bell, Home, User } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import SidebarItems from "./sidebar-items-";
import SideBarPost from "./sidebar-post";
import SideBarAccount from "./sidebar-account";
import { IUser } from "@/types";

interface Props {
    user: IUser
}

const Sidebar = ({ user }: Props) => {
    const sideBarItem = [
        {
            label: "Home",
            path: "/",
            icon: Home,
        },
        {
            label: "Notifications",
            path: `/notifications/${user?._id}`,
            icon: Bell
        },
        {
            label: "Profile",
            path: `/profile/${user?._id}`,
            icon: User,
        },

    ]

    return (
        <div className="sticky left-0 top-0 h-screen lg:w-[266px] w-fit flex flex-col justify-between py-4 pl-2">
            <div className="flex flex-col space-y-2 lg:items-start lg:justify-start items-center justify-center">
                <div className="rounded-full h-20 w-20 p-4 flex items-center justify-center hover:bg-sky-300 hover:bg-opacity-10 cursor-pointer transition">
                    <Image src={"/images/twitter-x.png"} alt="Twitter x" width={40} height={40} className="hover:bg-slate-700" />
                </div>

                {sideBarItem.map(item => (
                    <Link key={item.path} href={item.path} >
                        <SidebarItems {...item} />
                    </Link>
                ))}

                <SideBarPost />

            </div>
            <SideBarAccount user={user} />
        </div>
    )
}

export default Sidebar