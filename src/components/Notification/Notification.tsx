import { ErrorMessages, Patch } from '@/constants/common.constants';
import Link from 'next/link';
import { IconThumbUp } from '@tabler/icons-react';
import { useRemoveNotificationMutation } from '@/redux/services/notificationApi';
import styles from './notification.module.scss';
import { notifications } from '@mantine/notifications';
import { useEffect } from 'react';

const Notification = ({
  id,
  notificationMessage,
}: {
  id: number;
  notificationMessage: string;
}): JSX.Element => {
  const { type, userId, postId, userName, postTitle, message, comment } =
    JSON.parse(notificationMessage);

  const [removeNotification, resultDeleteComment] = useRemoveNotificationMutation();

  const handleRemove = async (): Promise<void> => {
    await removeNotification(id);
  };

  useEffect(() => {
    if (resultDeleteComment.isError) {
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
  }, [resultDeleteComment.isError]);

  if (type === 'like') {
    return (
      <div className={styles.notificationItem}>
        <IconThumbUp size={25} strokeWidth="1.2" />
        &nbsp;
        <Link href={`${Patch.author}/${userId}`} className={styles.user}>
          {userName}
        </Link>
        &nbsp;
        <span>{message}</span>
        &nbsp;
        <Link href={`${Patch.post}/${postId}`} className={styles.title}>
          {postTitle}
        </Link>
        <button onClick={handleRemove}>remove</button>
      </div>
    );
  }

  if (type === 'dislike') {
    return (
      <div className={styles.notificationItem}>
        <Link href={`${Patch.author}/${userId}`} className={styles.user}>
          {userName}
        </Link>
        &nbsp;
        <span>{message}</span>
        &nbsp;
        <Link href={`${Patch.post}/${postId}`} className={styles.title}>
          {postTitle}
        </Link>
        <button onClick={handleRemove}>remove</button>
      </div>
    );
  }

  if (type === 'follow' || type === 'unfollow') {
    return (
      <div className={styles.notificationItem}>
        <Link href={`${Patch.author}/${userId}`} className={styles.user}>
          {userName}
        </Link>
        &nbsp;
        <span>{message}</span>
        <button onClick={handleRemove}>remove</button>
      </div>
    );
  }

  if (type === 'comment') {
    return (
      <div className={styles.notificationItem}>
        <span>You`r post </span>
        &nbsp;
        <Link href={`${Patch.post}/${postId}`} className={styles.title}>
          {postTitle}
        </Link>
        &nbsp;
        <span>{message}</span>
        &nbsp;
        <span>{comment}</span>
        <button onClick={handleRemove}>remove</button>
      </div>
    );
  }

  return <></>;
};

export default Notification;
