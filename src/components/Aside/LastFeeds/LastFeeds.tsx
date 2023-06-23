import PostPreview from '@/components/PostPreview/PostPreview';
import { Patch } from '@/constants/common.constants';
import { useAppSelector } from '@/hooks/redux';
import { useGetFeedsQuery } from '@/redux/services/subscribersApi';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { amatic } from '@/app/layout';
import Link from 'next/link';
import styles from './lastFeeds.module.scss';

const LastFeeds = ({
  setShowLastFeeds,
}: {
  setShowLastFeeds: Dispatch<SetStateAction<boolean>>;
}): JSX.Element => {
  const { user } = useAppSelector((state) => state.userReducer);
  const { data: result, isError } = useGetFeedsQuery({ userId: user.id, page: 0 });

  useEffect(() => {
    if (isError) {
      setShowLastFeeds(false);
    }
  }, [isError, setShowLastFeeds]);

  return (
    <div className={styles.container}>
      <p className={`${styles.title} ${amatic.className}`}>New to your subscriptions</p>
      {result?.posts?.length === 0 && (
        <p style={{ textAlign: 'center', fontSize: '1.6rem' }}>You don`t have subscriptions</p>
      )}
      {!!result?.posts?.length &&
        result?.posts?.slice(0, 6).map((post) => <PostPreview key={post.id} post={post} />)}
      <Link href={`${Patch.me}${Patch.feeds}`} className={styles.linkMore}>
        See the full list
      </Link>
    </div>
  );
};

export default LastFeeds;
