import { reverbClientWithAuth } from '../../remote/reverb-api/reverbClient'

export const getNumLikes = async (postId: string): Promise<number> => {
    const { data } = await reverbClientWithAuth.get<number>('/api/like/get-number-of-likes/' + postId);
    return data;
}

export const likePost = async (postId: string) => {
    reverbClientWithAuth.put<void>('/api/like/like-post/' + postId);
}

export const checkIfPostCanBeLiked = async (postId: string): Promise<boolean> => {
    const { data: canLike } = await reverbClientWithAuth.get<boolean>('/api/like/check-if-liked/' + postId);

    return canLike;
}
