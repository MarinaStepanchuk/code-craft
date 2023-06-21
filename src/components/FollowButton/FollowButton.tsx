'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ErrorMessages, Patch } from '@/constants/common.constants';
import { useAppSelector } from '@/hooks/redux';
import {
  useCheckSubscribeQuery,
  useSubscribeMutation,
  useUnsubscribeMutation,
} from '@/redux/services/subscribersApi';
import { notifications } from '@mantine/notifications';
import { useEffect } from 'react';
import { useCreateNotificationMutation } from '@/redux/services/notificationApi';
import createNotificationMessage from '@/utils/createNotificationMessage';
import getNameFromEmail from '@/utils/getNameFromEmail';
import styles from './followButton.module.scss';

const FollowButton = ({ authorId }: { authorId: string }): JSX.Element => {
  const { status } = useSession();
  const { push } = useRouter();
  const { user } = useAppSelector((state) => state.userReducer);
  const { data: isSubscribed } = useCheckSubscribeQuery({ author: authorId, subscriber: user.id });
  const [subscribe, resultSubscribe] = useSubscribeMutation();
  const [unsubscribe, resultUnsubscribe] = useUnsubscribeMutation();
  const [createNotification] = useCreateNotificationMutation();

  const handleFollowing = async (): Promise<void> => {
    if (status !== 'authenticated') {
      push(Patch.signIn);
    }

    if (isSubscribed) {
      await unsubscribe({
        author: authorId,
        subscriber: user.id,
      });
      const message = createNotificationMessage({
        type: 'unfollow',
        userId: user.id,
        userName: user.name || getNameFromEmail(user.email),
      });
      await createNotification({ userId: authorId, message });
    } else {
      await subscribe({
        author: authorId,
        subscriber: user.id,
      });
      const message = createNotificationMessage({
        type: 'follow',
        userId: user.id,
        userName: user.name || getNameFromEmail(user.email),
      });
      await createNotification({ userId: authorId, message });
    }
  };

  useEffect(() => {
    if (resultSubscribe.isError || resultUnsubscribe.isError) {
      notifications.show({
        message: ErrorMessages.unknown,
        color: 'red',
        autoClose: 3000,
        withBorder: true,
        styles: () => ({
          description: { fontSize: '1.4rem' },
        }),
      });
    }
  }, [resultSubscribe.isError, resultUnsubscribe.isError]);

  if (authorId === user.id) {
    return <></>;
  }

  return (
    <button
      className={styles.followButton}
      onClick={handleFollowing}
      disabled={resultSubscribe.isLoading || resultUnsubscribe.isLoading}
    >
      {isSubscribed ? 'Unfollow' : 'Follow'}
    </button>
  );
};

export default FollowButton;
