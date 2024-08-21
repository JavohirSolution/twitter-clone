"use client";

import { LucideIcon } from "lucide-react";
import { BsDot } from "react-icons/bs";

interface Props {
    label: string,
    icon: LucideIcon,
    notification?: boolean
}

const SidebarItems = ({ icon: Icon, label, notification }: Props) => {
    return (
        <div className="flex flex-row items-center">
            {/* MOBILE SIDEBAR ITEM */}
            <div className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 lg:hidden">
                <Icon size={30} color="white" />
            </div>

            {/* DESKTOP SIDEBAR ITME */}
            <div className="relative hidden lg:flex hover:bg-gray-800 px-6 py-3  rounded-full gap-4">
                <Icon size={24} color="white" />
                <p className="hidden lg:block text-xl text-white">{label}</p>
                {notification ? (
                    <BsDot className={"text-sky-500 absolute -top-4 left-0"} size={70} />
                ) : null}
            </div>
        </div>
    )
}

export default SidebarItems