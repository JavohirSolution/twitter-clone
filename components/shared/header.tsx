"use client";

import { useRouter } from "next/navigation";
import { BiArrowBack } from "react-icons/bi";

interface Props {
    label: string;
    isBack?: boolean
}

const Header = ({ label, isBack }: Props) => {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    }

    return (
        <div className="bg-black border-b-[1px] border-neutral-800 w-full p-5 sticky z-30">
            <div className="flex items-center gap-2 ">
                {isBack && (
                    <BiArrowBack
                        onClick={handleBack}
                        color={"white"}
                        size={20}
                        className={"cursor-pointer hover:opacity-70 transition"}
                    />
                )}
                <h2 className="text-xl font-semibold">{label}</h2>
            </div>
        </div>
    )
}

export default Header