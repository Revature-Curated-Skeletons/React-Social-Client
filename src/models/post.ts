import { Profile } from "./profile";
import { Comment } from "./comment";

export interface Post {
    id: string,
    title: string,
    postText: string,
    contentLink: string,
    contentType: string,
    date: string,
    comments: Comment[]
}

export const initialPost: Post = {
    id: "",
    title: "",
    postText: "",
    contentLink: "",
    contentType:"",
    date: "",
    comments: []
}
