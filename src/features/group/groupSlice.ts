import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
import { RootState, store } from "../../app/store";
import { setTokenAsync } from "../login/authSlice";
import { Group } from "./Group"
import { getGroupByName } from "./Group.api";


const initialState: Group = {
    groupID: '',
    owner : {
        id: '',
        email: ''
    },
    name : '',
    description : '',
    headerImg : '',
    profilePic : '',
    joinedUsers : []
};

export const setGroupAsync = createAsyncThunk<Group, string>(
    'group/get/async',
    async (groupName: string, thunkAPI) => {
        try {
            console.log("Calling API for group")
            return await getGroupByName(groupName);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const GroupSlice = createSlice({
    name: "group",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(setGroupAsync.fulfilled, (state, action) => {
            return action.payload;
        })
    }

})

type Rootstate = ReturnType<typeof store.getState>;

export default GroupSlice.reducer;
export const selectGroup = (state: RootState) => {
    return state.group;
}