export interface Profile {
    id: string,
    first_name: string,
    last_name: string,
    birthday: string,
    hobby: string,
    location: string,
    profile_img: string,
    header_img: string,
    about_me: string,
    user_id: string,
    follower_num: number,
    following_num: number
}

export const initialProfile: Profile = {
    id: "",
    first_name: "",
    last_name: "",
    birthday: "",
    hobby: "",
    location: "",
    profile_img: "",
    header_img: "",
    about_me: "",
    user_id: "",
    follower_num: 0,
    following_num: 0
}