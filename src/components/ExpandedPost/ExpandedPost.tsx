'use client';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { postSlice } from '@/redux/store/reducers/postSlice';
import { IExpandedPost } from '@/types/interfaces';
import { useVisitPostMutation } from '@/redux/services/postsApi';
import { useEffect, useLayoutEffect } from 'react';
import PostContentRead from './PostContentRead/PostContentRead';
import ExpendedPostHeader from './ExpendedPostHeader/ExpendedPostHeader';
import styles from './expandedPost.module.scss';
import ExpendedPostFooter from './ExpendedPostFooter/ExpendedPostFooter';
import TagsList from './TagsList/TagsList';

const ExpandedPost = ({ data }: { data: IExpandedPost }): JSX.Element => {
  const { user: userData } = useAppSelector((state) => state.userReducer);
  const { tags } = useAppSelector((state) => state.postReducer.post);

  const { setPost } = postSlice.actions;
  const dispatch = useAppDispatch();

  const [visitPost] = useVisitPostMutation();

  useEffect(() => {
    if (data.user.id !== userData.id) {
      visitPost(data.id);
    }
  }, [data.id, data.user.id, userData.id, visitPost]);

  useEffect(() => {
    dispatch(setPost(data));
  }, [data, dispatch, setPost]);

  return (
    <section className={styles.postSection}>
      <ExpendedPostHeader />
      <PostContentRead data={data} />
      <div className={styles.tagsWrapper}>
        <TagsList tags={tags} />
      </div>
      <ExpendedPostFooter />
    </section>
  );
};

export default ExpandedPost;
