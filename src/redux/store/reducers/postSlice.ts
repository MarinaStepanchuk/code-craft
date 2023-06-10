import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IExpandedPost } from '@/types/interfaces';

interface IInitialStatePostSlice {
  post: IExpandedPost;
}

export const initialState: IInitialStatePostSlice = {
  post: {
    id: 0,
    title: '',
    content: '',
    banner: '',
    tags: [],
    viewCount: 0,
    updatedDate: new Date(),
    UserId: '',
    user: {
      id: '',
      email: '',
      name: '',
      avatarUrl: '',
      bio: '',
      twitter: '',
      mail: '',
      instagram: '',
    },
    likes: 0,
  },
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPost(state, action: PayloadAction<IExpandedPost>) {
      state.post = action.payload;
    },
  },
});

export const { setPost } = postSlice.actions;
export default postSlice.reducer;
