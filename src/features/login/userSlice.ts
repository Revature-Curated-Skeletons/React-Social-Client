import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser } from "./Login.api";
import User from "./User";
import { RootState, store } from "../../app/store";


interface UserState {
    id: string,
    email: string
}

const initialState: UserState = {
    id: "",
    email: ""
}

export const setUserAsync = createAsyncThunk<User, object>(
    'user/get/async',
    async ( nothing, thunkAPI ) =>
    {
        try
        {
            return await getUser();
        } catch ( error )
        {
            return thunkAPI.rejectWithValue( error );
        }
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(setUserAsync.fulfilled, (state, action) => {
            return action.payload;
        })
    }
})

export const selectUser = ( state: RootState ) =>
{
    return state.user;
}

export default userSlice.reducer;