'use client';

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import postReducer from './reducers/postSlice';
import { postsApi } from '../services/postsApi';
import { userApi } from '../services/userApi';

export const store = configureStore({
  reducer: {
    userReducer,
    postReducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware, userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
