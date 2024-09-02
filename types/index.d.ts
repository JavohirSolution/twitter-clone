import { ReactNode } from "react";
import { number } from "zod";

export interface IUser {
    createdAt: Date;
    username: string;
    email: string;
    name: string;
    profileImage: string;
    coverImage: string;
    updatedAt: Date;
    _id: string;
    bio: string;
    location: string;
    followers: string[];
    following: string[];
    hasNewNotifications: boolean;
    notifications: string[];
    isFollowing: boolean;
}

export interface Post {
    _id: string;
    body: string;
    user: IUser;
    likes: number;
    comments: number;
    updatedAt: string;
    createdAt: string;
    hasLiked: boolean;
}