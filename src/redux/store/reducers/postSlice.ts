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
    countLikes: 0,
    isLiked: false,
  },
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPost(state, action: PayloadAction<IExpandedPost>) {
      state.post = action.payload;
    },
    updateLike(state, action: PayloadAction<boolean>) {
      state.post.isLiked = action.payload;
      if (action.payload) {
        state.post.countLikes += 1;
      } else {
        state.post.countLikes -= 1;
      }
    },
  },
});

export const { setPost, updateLike } = postSlice.actions;
export default postSlice.reducer;
