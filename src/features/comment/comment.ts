import { Author } from "./author";


export interface Comment {
    commentId: string,
    commentText: string,
    date: Date | null,
    author: Author  | null
}

export const initialComment: Comment = {
    commentId: "",
    commentText: "",
    date: null,
    author: null
}