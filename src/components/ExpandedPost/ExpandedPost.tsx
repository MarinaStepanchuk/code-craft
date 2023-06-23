'use client';

import { useAppSelector } from '@/hooks/redux';
import { IPostWithUser } from '@/types/interfaces';
import { useVisitPostMutation } from '@/redux/services/postsApi';
import { useEffect } from 'react';
import PostContentRead from './PostContentRead/PostContentRead';
import ExpendedPostHeader from './ExpendedPostHeader/ExpendedPostHeader';
import styles from './expandedPost.module.scss';
import ExpendedPostFooter from './ExpendedPostFooter/ExpendedPostFooter';
import TagsList from './TagsList/TagsList';

const ExpandedPost = ({ data }: { data: IPostWithUser }): JSX.Element => {
  const { user: userData } = useAppSelector((state) => state.userReducer);
  const { tags } = data;

  const [visitPost] = useVisitPostMutation();

  useEffect(() => {
    if (data.user.id !== userData.id) {
      visitPost(data.id);
    }
  }, [data.id, data.user.id, userData.id, visitPost]);

  return (
    <section className={styles.postSection}>
      <ExpendedPostHeader data={data} />
      <PostContentRead data={data} />
      <div className={styles.tagsWrapper}>
        <TagsList tags={tags} />
      </div>
      <ExpendedPostFooter data={data} />
    </section>
  );
};

export default ExpandedPost;
