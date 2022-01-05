import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../features/login/authSlice';
import postsReducer from '../features/post/postSlice';
import profileReducer from '../features/profile/profileSlice';



export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    profile: profileReducer
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
