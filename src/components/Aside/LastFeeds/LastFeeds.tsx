import PostPreview from '@/components/PostPreview/PostPreview';
import { ErrorMessages, Patch } from '@/constants/common.constants';
import { useAppSelector } from '@/hooks/redux';
import { useGetFeedsQuery } from '@/redux/services/subscribersApi';
import { IPostWithUser } from '@/types/interfaces';
import getRandomList from '@/utils/getRandomList';
import { notifications } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import { amatic } from '@/app/layout';
import Link from 'next/link';
import styles from './lastFeeds.module.scss';

const LastFeeds = (): JSX.Element => {
  const { user } = useAppSelector((state) => state.userReducer);
  const { data: result, isLoading, isError } = useGetFeedsQuery({ userId: user.id, page: 0 });
  const [renderList, setRenderList] = useState<IPostWithUser[]>();

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

    if (result) {
      const randomList = getRandomList(result?.posts, 5);
      setRenderList(randomList);
    }
  }, [isError, result]);

  if (isError) {
    return <></>;
  }

  if (isLoading) {
    return <></>;
  }

  if (!result?.posts.length) {
    return <p style={{ textAlign: 'center', fontSize: '1.6rem' }}>You don`t have subscriptions</p>;
  }

  return (
    <div className={styles.container}>
      <p className={`${styles.title} ${amatic.className}`}>New to your subscriptions</p>
      {renderList?.map((post) => (
        <PostPreview key={post.id} post={post} />
      ))}
      <Link href={`${Patch.me}${Patch.feeds}`} className={styles.linkMore}>
        See the full list
      </Link>
    </div>
  );
};

export default LastFeeds;
