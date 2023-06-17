'use client';

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import postReducer from './reducers/postSlice';
import { postsApi } from '../services/postsApi';
import { userApi } from '../services/userApi';
import { commentsApi } from '../services/commentsApi';
import { chatApi } from '../services/chatApi';
import { subscribersApi } from '../services/subscribersApi';

export const store = configureStore({
  reducer: {
    userReducer,
    postReducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [subscribersApi.reducerPath]: subscribersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      postsApi.middleware,
      userApi.middleware,
      commentsApi.middleware,
      chatApi.middleware,
      subscribersApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
