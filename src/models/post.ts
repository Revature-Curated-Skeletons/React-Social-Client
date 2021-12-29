import { Profile } from "./profile";
import { Comment } from "./comment";

export interface Post {
    id: number,
    title: string,
    postText: string,
    embedURL: string,
    contentType: string,
    date: string,
    profile: Profile,
    comments: Comment[]
}

export const initialPost: Post = {
    id: 0,
    title: "",
    postText: "",
    embedURL: "",
    contentType:"",
    date: "",
    profile: {
        id: 0,
        first_name: "",
        last_name: "",
        birthday: "",
        hobby: "",
        location: "",
        profile_img: "",
        header_img: "",
        about_me: ""
    },
    comments: []
}
