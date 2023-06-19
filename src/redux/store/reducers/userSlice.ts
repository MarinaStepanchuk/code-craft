import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUser } from '@/types/interfaces';

interface IInitialStateUserSlice {
  user: IUser;
}

export const initialState: IInitialStateUserSlice = {
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
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
