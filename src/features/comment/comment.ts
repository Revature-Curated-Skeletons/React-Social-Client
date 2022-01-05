import { Profile } from "../profile/profile";

export interface Comment {
    commentId: string,
    commentText: string,
    date: Date | null
}

export const initialComment: Comment = {
    commentId: "",
    commentText: "",
    date: null
}