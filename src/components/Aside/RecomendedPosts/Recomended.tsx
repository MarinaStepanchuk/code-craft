import { amatic } from '@/app/layout';
import { Patch } from '@/constants/common.constants';
import { useGetRecomendedPostsQuery } from '@/redux/services/postsApi';
import Link from 'next/link';
import { Dispatch, SetStateAction, useEffect } from 'react';
import PostPreview from '@/components/PostPreview/PostPreview';
import styles from './recomended.module.scss';

const RecommendedPosts = ({
  setShowRecommendedPosts,
}: {
  setShowRecommendedPosts: Dispatch<SetStateAction<boolean>>;
}): JSX.Element => {
  const { data: result, isError } = useGetRecomendedPostsQuery(5);

  useEffect(() => {
    if (isError) {
      setShowRecommendedPosts(false);
    }
  }, [isError, setShowRecommendedPosts]);

  return (
    <div className={styles.container}>
      <p className={`${styles.title} ${amatic.className}`}>Recommended posts</p>
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
