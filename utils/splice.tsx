import { Post } from "@/types";
import { formatDistanceToNowStrict } from "date-fns";

export function spliceUserName(name: string) {
    let username: string;
    if (name.split("").length > 15) {
        username = name.toLocaleLowerCase().replace(" ", "").slice(0, 8);
    } else {
        username = name.toLocaleLowerCase().replace(" ", "");
    }
    return username
}

export function formatPostDate(post: Post) {
    const date = new Date(post.createdAt);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
        console.error('Invalid date:', post.createdAt);
        return 'Invalid date';
    }

    // Return the formatted distance
    return `${formatDistanceToNowStrict(date)} ago`;
} "2024 -08 - 22T14: 54: 27.925 +00:00"