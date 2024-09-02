"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone"
import { MdEdit } from "react-icons/md"
import { IoIosCloudDownload } from "react-icons/io"

interface Props {
    coverImage: string,
    onChange: (coverImage: string) => void
}

const CoverImageUpload = ({ coverImage, onChange }: Props) => {
    const [image, setImage] = useState(coverImage);

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
                className: "text-wihte text-center border-none rounded-md w-full h-[200px] bg-neutral-700 cursor-pointer"
            })}
        >
            <input {...getInputProps()} />
            {image ? (
                <div className="w-full h-[200px] relative left-0 right-0">
                    <Image
                        src={image}
                        alt="Upload image"
                        fill
                        style={{ objectFit: "cover" }}
                    />
                    <div className="absolute inset-0 flex justify-center items-center">
                        <MdEdit size={24} className={"text-white"} />
                    </div>
                </div>
            ) : (
                <div className="w-full h-[200px] flex justify-center cursor-pointer flex-col gap-2 items-center">
                    <IoIosCloudDownload size={50} />
                    <p>Upload cover image</p>
                </div>
            )}
        </div >
    )
}

export default CoverImageUpload