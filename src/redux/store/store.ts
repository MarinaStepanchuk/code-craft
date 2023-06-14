'use client';

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import postReducer from './reducers/postSlice';
import { postsApi } from '../services/postsApi';
import { userApi } from '../services/userApi';
import { commentsApi } from '../services/commentsApi';

export const store = configureStore({
  reducer: {
    userReducer,
    postReducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware, userApi.middleware, commentsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
