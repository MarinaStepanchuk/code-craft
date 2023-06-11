'use client';

import { useAppDispatch, useAppSelector } from '@/huks/redux';
import { postSlice } from '@/redux/store/reducers/postSlice';
import { IExpandedPost } from '@/types/interfaces';
import { useVisitPostMutation } from '@/redux/services/postsApi';
import { useEffect } from 'react';
import PostContentRead from './PostContentRead/PostContentRead';
import ExpendedPostHeader from './ExpendedPostHeader/ExpendedPostHeader';
import styles from './expandedPost.module.scss';
import ExpendedPostFooter from './ExpendedPostFooter/ExpendedPostFooter';

const ExpandedPost = ({ data }: { data: IExpandedPost }): JSX.Element => {
  const { user: userData } = useAppSelector((state) => state.userReducer);
  const { setPost } = postSlice.actions;
  const dispatch = useAppDispatch();
  dispatch(setPost(data));
  const [visitPost] = useVisitPostMutation();

  useEffect(() => {
    if (data.user.id !== userData.id) {
      visitPost(data.id);
    }
  }, [data.id, data.user.id, userData.id, visitPost]);

  return (
    <section className={styles.postSection}>
      <ExpendedPostHeader />
      <PostContentRead />
      <ExpendedPostFooter />
    </section>
  );
};

export default ExpandedPost;
