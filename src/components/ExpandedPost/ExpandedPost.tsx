'use client';

import { useAppDispatch } from '@/huks/redux';
import { postSlice } from '@/redux/store/reducers/postSlice';
import { IExpandedPost } from '@/types/interfaces';
import PostContentRead from './PostContentRead/PostContentRead';
import ExpendedPostHeader from './ExpendedPostHeader/ExpendedPostHeader';
import styles from './expandedPost.module.scss';
import ExpendedPostFooter from './ExpendedPostFooter/ExpendedPostFooter';

const ExpandedPost = ({ data }: { data: IExpandedPost }): JSX.Element => {
  const { setPost } = postSlice.actions;
  const dispatch = useAppDispatch();
  dispatch(setPost(data));

  return (
    <section className={styles.postSection}>
      <ExpendedPostHeader />
      <PostContentRead />
      <ExpendedPostFooter />
    </section>
  );
};

export default ExpandedPost;
