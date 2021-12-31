import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Token } from "./token";
import { getToken } from './token.api'
import { Credentials } from "./credentials";

export type TokenState = Token[];

const initialState: TokenState = [{
    token: ""
}]

export const setTokenAsync = createAsyncThunk<Token, Credentials>(
    'token/get/async',
    async ( cred: Credentials, thunkAPI ) =>
    {
        try
        {
            return await getToken( cred.email, cred.password );
        } catch ( error )
        {
            return thunkAPI.rejectWithValue( error );
        }
    }
);

export const authSlice = createSlice( {
    name: "auth",
    initialState: initialState,

    reducers: {
        logout: ( state ) =>
        {
            state.pop()
            state.push( initialState[0] )
        },
    },
    extraReducers: ( builder ) =>
    {
        builder
            .addCase( setTokenAsync.pending, ( state ) =>
            {
                // do nothing
            } )
            .addCase( setTokenAsync.fulfilled, ( state, action ) =>
            {
                // console.log( "From setTokenAsync extraReducer: ", action.payload.token );
                return [action.payload];
            } )
            .addCase( setTokenAsync.rejected, ( state, action ) =>
            {
                // console.log( action.error );
            } )
    }

} );
export const { logout } = authSlice.actions;
export default authSlice.reducer;