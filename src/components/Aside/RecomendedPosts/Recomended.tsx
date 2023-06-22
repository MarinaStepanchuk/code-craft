import { amatic } from '@/app/layout';
import { ErrorMessages, Patch } from '@/constants/common.constants';
import { useGetRecomendedPostsQuery } from '@/redux/services/postsApi';
import { notifications } from '@mantine/notifications';
import Link from 'next/link';
import { useEffect } from 'react';
import PostPreview from '@/components/PostPreview/PostPreview';
import styles from './recomended.module.scss';

const RecommendedPosts = (): JSX.Element => {
  const { data: result, isLoading, isError } = useGetRecomendedPostsQuery(5);

  useEffect(() => {
    if (isError) {
      notifications.show({
        message: ErrorMessages.errorResponse,
        color: 'red',
        autoClose: 3000,
        withBorder: true,
        styles: () => ({
          description: { fontSize: '1.4rem' },
        }),
      });
    }
  }, [isError]);

  if (isError) {
    return <></>;
  }

  if (isLoading) {
    return <></>;
  }

  return (
    <div className={styles.container}>
      <p className={`${styles.title} ${amatic.className}`}>Recommended topics</p>
      {!!result?.length && (
        <div className={styles.listTags}>
          {result.map((post) => (
            <PostPreview key={post.id} post={post} />
          ))}
        </div>
      )}
      <Link href={`${Patch.searchPublications}?search=`} className={styles.linkMore}>
        See more
      </Link>
    </div>
  );
};

export default RecommendedPosts;
