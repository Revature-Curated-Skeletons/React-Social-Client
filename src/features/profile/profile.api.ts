import { Profile } from "./profile";
import { reverbClientWithAuth } from "../../remote/reverb-api/reverbClient"

export const getProfile = async () => {
    const {data: profile} = await reverbClientWithAuth.get<Profile>("/api/profile/getUsersProfile");
    return profile;
}

export const updateProfile = async (updatedProfile:Profile):Promise<Profile> => {
    const { data: profile } = await reverbClientWithAuth.put<Profile>("/api/profile/update", updatedProfile);
    return profile;
}

export const getProfileById = async (id: string) => {
    const {data: profile} = await reverbClientWithAuth.get<Profile>("/api/profile/"+id);
    return profile;
}

export const checkProfileOwnership = async (id: string) => {
    const {data: owns} = await reverbClientWithAuth.get<boolean>("/api/profile/checkProfileOwnership/"+id);
    return owns;
}