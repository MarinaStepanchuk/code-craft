import PostPreview from '@/components/PostPreview/PostPreview';
import { ErrorMessages } from '@/constants/common.constants';
import { useAppSelector } from '@/hooks/redux';
import { useGetFeedsQuery } from '@/redux/services/subscribersApi';
import { notifications } from '@mantine/notifications';
import { useEffect } from 'react';

const LastFeeds = (): JSX.Element => {
  const { user } = useAppSelector((state) => state.userReducer);
  const { data: result, isError } = useGetFeedsQuery({ userId: user.id, page: 0 });

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

  if (!result?.posts.length) {
    return <p style={{ textAlign: 'center', fontSize: '1.6rem' }}>You don`t have subscriptions</p>;
  }

  return (
    <div>
      {result?.posts.map((post) => (
        <PostPreview key={post.id} post={post} />
      ))}
    </div>
  );
};

export default LastFeeds;
