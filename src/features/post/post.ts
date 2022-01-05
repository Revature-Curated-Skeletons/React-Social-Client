import { Profile } from "../profile/profile";
import { Comment } from "../comment/comment";

export interface Post {
    id: string,
    title: string,
    postText: string,
    contentLink: string,
    contentType: string,
    date: Date | null,
    comments: Comment[],
    authorID: string
}

export const initialPost: Post = {
    id: "",
    title: "",
    postText: "",
    contentLink: "",
    contentType:"",
    date: null,
    comments: [],
    authorID: ""
}
