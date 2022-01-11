import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../features/login/authSlice';
import postsReducer from '../features/post/postSlice';
import profileReducer from '../features/profile/profileSlice';
import userReducer from '../features/login/userSlice';
import groupReducer from '../features/group/groupSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    profile: profileReducer,
    user: userReducer,
    group: groupReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
