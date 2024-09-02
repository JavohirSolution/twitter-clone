"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { MdEdit } from "react-icons/md"
import { IoIosCloudDownload } from "react-icons/io"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IUser } from "@/types";


interface Props {
    user: IUser
    profileImage: string,
    onChange: (profileImage: string) => void
}

const ProfileImageUpload = ({ onChange, profileImage, user }: Props) => {
    const [image, setImage] = useState(profileImage);

    const handleChange = useCallback(
        (coverImage: string) => {
            onChange(coverImage)
        },

        // eslint-disable-next-line react-hooks/exhaustive-deps
        [onchange]
    );

    const handleDrop = useCallback((files: any) => {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = (evt: any) => {
            setImage(evt.target.result);
            handleChange(evt.target.result)
        }
        reader.readAsDataURL(file)
    }, [handleChange])

    const { getInputProps, getRootProps } = useDropzone({
        maxFiles: 1,
        onDrop: handleDrop,
        accept: {
            "image/jpeg": [],
            "image/png": [],
        }
    })

    return (
        <div
            {...getRootProps({
                className: "text-center text-white border-none rounded-md",
            })}
        >
            <input {...getInputProps()} />
            {image ? (
                <div className="relative -top-20 left-6 rounded-full transition cursor-pointer w-32 h-32 border-4 border-black">
                    <Image
                        src={image}
                        fill
                        alt="Upload Image"
                        style={{ objectFit: "cover", borderRadius: "100%" }}
                    />
                    <div className="absolute inset-0 flex justify-center items-center">
                        <MdEdit size={24} className={"text-white"} />
                    </div>
                </div>
            ) : (
                <div className="relative -top-20 left-6">
                    <Avatar className="w-32 h-32 ring-4 ring-black bg-black">
                        <AvatarImage src={profileImage} />
                        <AvatarFallback className="bg-slate-800 text-7xl">{user?.name[0]}</AvatarFallback>
                        <div className="absolute inset-0 bg-black/40 rounded-full flex justify-center items-center">
                            <IoIosCloudDownload size={30} />
                        </div>
                    </Avatar>

                </div>
            )}
        </div>
    )
}

export default ProfileImageUpload