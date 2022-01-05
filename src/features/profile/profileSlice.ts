/* eslint-disable no-empty-pattern */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Profile } from "./profile";
import { getProfile, getProfileById, updateProfile } from "./profile.api";
import { store } from "../../app/store";

export type ProfileState = Profile;

const initialState: ProfileState = {
    id: "",
    first_name: "",
    last_name: "",
    birthday: "",
    hobby: "",
    location: "",
    profile_img: "",
    header_img: "",
    about_me: ""
}

export const getProfileAsync = createAsyncThunk<Profile, object>(
    'profile/get/async',
    async ( nothing, thunkAPI ) =>
    {
        try
        {
            return await getProfile();
        } catch ( error )
        {
            return thunkAPI.rejectWithValue( error );
        }
    }
);

export const getProfileByIdAsync = createAsyncThunk<Profile, string>(
    'profile/getbyid/async',
    async (id: string, thunkAPI ) =>
    {
        try
        {
            return await getProfileById(id);
        } catch ( error )
        {
            return thunkAPI.rejectWithValue( error );
        }
    }
);

export const updateProfileAsync = createAsyncThunk<Profile, Profile>(
    'profile/put/async',
    async ( updatedProfile:Profile, thunkAPI ) =>
    {
        try
        {
            return await updateProfile(updatedProfile);
        } catch ( error )
        {
            return thunkAPI.rejectWithValue( error );
        }
    }
);

const profileSlice = createSlice( {
    name: 'profile',
    initialState: initialState,
    reducers: {
    },
    extraReducers: ( builder ) =>
    {
        builder
            .addCase( getProfileAsync.pending, ( state ) =>
            {
                //do nothing
            } )
            .addCase( getProfileAsync.fulfilled, ( state, action ) =>
            {
                return action.payload;
            } )
            .addCase( getProfileAsync.rejected, ( state, action ) =>
            {
                // console.log( action.error );
            } )
            .addCase( getProfileByIdAsync.pending, ( state ) =>
            {
                //do nothing
            } )
            .addCase( getProfileByIdAsync.fulfilled, ( state, action ) =>
            {
                // console.log(action.payload.first_name);
                return action.payload;
            } )
            .addCase( getProfileByIdAsync.rejected, ( state, action ) =>
            {
                // console.log( action.error );
            } )
            .addCase( updateProfileAsync.pending, ( state ) =>
            {
                //do nothing
            } )
            .addCase( updateProfileAsync.fulfilled, ( state, action ) =>
            {
                return action.payload;
            } )
            .addCase( updateProfileAsync.rejected, ( state, action ) =>
            {
                // console.log( action.error );
            } )
    }

} )

type Rootstate = ReturnType<typeof store.getState>;
export const selectProfile = ( state: Rootstate ) =>
{
    return state.profile
}

export default profileSlice.reducer;