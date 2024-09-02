"use client";

import useEditModal from "@/hooks/useEditModal";
import { IUser } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CoverImageUpload from "../shared/cover-image-upload";
import ProfileImageUpload from "../shared/profile-image-upload";
import Modal from "../ui/modal";
import axios from "axios";
import { Loader2 } from "lucide-react";

interface Props {
    user: IUser;
}

const EdidModal = ({ user }: Props) => {
    const [coverImage, setCoverImage] = useState<string>("");
    const [profileImage, setProfileImage] = useState<string>("");
    const [isloading, setIsLoading] = useState<boolean>(false);

    const editModal = useEditModal();
    const router = useRouter();

    useEffect(() => {
        setCoverImage(user.coverImage);
        setProfileImage(user.profileImage);
    }, [user])

    const handleImageUpload = async (image: string, isProfileImage: boolean) => {
        try {
            setIsLoading(true)
            await axios.put(`/api/users/${user._id}`, {
                [isProfileImage ? "profileImage" : "coverImage"]: image,
            })
            setIsLoading(false)
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    const bodyContent = (
        <>
            <CoverImageUpload
                coverImage={coverImage}
                onChange={image => handleImageUpload(image, false)}
            />
            <ProfileImageUpload
                user={user}
                profileImage={profileImage}
                onChange={image => handleImageUpload(image, true)}
            />
        </>
    )

    return (
        <Modal
            isOpen={editModal.isOpen} onClose={editModal.onClose} body={bodyContent}
        />
    )
}

export default EdidModal