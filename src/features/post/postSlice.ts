import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Post } from './post';
import { createPost, getAllPosts, getFollowingPosts } from "./post.api";
import { store } from "../../app/store";
import { ActionCodeOperation } from "firebase/auth";


export type PostState = Post[];

const initialState: PostState = [];

export const getPostsAsync = createAsyncThunk<Post[], object>(
    'post/get/async',
    async (nothing, thunkAPI) => {
        try {
            return await getAllPosts();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const getFollowPostsAsync = createAsyncThunk<Post[], object>(
    'post/getfollow/async',
    async (nothing, thunkAPI) => {
        try {
            return await getFollowingPosts();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const postPostAsync = createAsyncThunk<Post, Post>(
    'post/post/async',
    async (neoPost: Post, thunkAPI) => {
        try {
            return await createPost(neoPost);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const postSlice = createSlice({
    name: 'posts',
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(getPostsAsync.pending, (state) => {
            // do nothing
        })
        .addCase(postPostAsync.pending, (state) => {
            // do nothing
        })
        .addCase(getFollowPostsAsync.pending, (state) => {
            
        })
        .addCase(getPostsAsync.fulfilled, (state, action) => {
            return action.payload;
        })
        .addCase(postPostAsync.fulfilled, (state, action) => {
            // state.push(action.payload);
        })
        .addCase(getFollowPostsAsync.fulfilled, (state, action) => {
            return action.payload;
            // return action.payload;
        })
        .addCase(getPostsAsync.rejected, (state, action) => {
            // console.log(action.error);
        })
        .addCase(postPostAsync.rejected, (state, action) => {
            // console.log(action.error);
        })
        .addCase(getFollowPostsAsync.rejected, (state, action) => {
            // state.push(action.payload);
        })
    }
});

type Rootstate = ReturnType<typeof store.getState>;
export const selectPosts = (state: Rootstate) => {
    return state.posts
}

export default postSlice.reducer;