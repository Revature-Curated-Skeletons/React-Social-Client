import { reverbClientWithAuth } from '../../remote/reverb-api/reverbClient'


export const getUserFollowers = async (id: string): Promise<number> => {
    const {data} = await reverbClientWithAuth.get<number>('/api/user/get-followers/' + id);
    return data;
}

export const getUserFollowings = async (id: string): Promise<number> => {
    const {data} = await reverbClientWithAuth.get<number>('/api/user/get-following-num/' + id);
    return data;
}

export const getUserIdFromProfileId = async (pId: string) => {
    const {data: id} = await reverbClientWithAuth.get<string>('/api/user/profile/' + pId);
    return id;
}

export const followUser = async (id: string) => {
    reverbClientWithAuth.put<void>('api/user/follow-user/'+id);
}

export const unfollowUser = async (id: string) => {
    reverbClientWithAuth.delete<void>('api/user/unfollow-user/'+id);
}

export const canFollow = async (id:string): Promise<boolean> => {
    const {data: followable} = await reverbClientWithAuth.get<boolean>('api/user/can-follow/' + id);
    return !followable;
}