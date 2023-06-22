import { ErrorMessages, Patch } from '@/constants/common.constants';
import Link from 'next/link';
import {
  IconThumbUp,
  IconMinus,
  IconThumbUpOff,
  IconMessageDots,
  IconUserPlus,
  IconUserOff,
} from '@tabler/icons-react';
import { Tooltip } from '@mantine/core';

import { useRemoveNotificationMutation } from '@/redux/services/notificationApi';
import { notifications } from '@mantine/notifications';
import { useEffect } from 'react';
import styles from './notification.module.scss';

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
        <Tooltip label="mark as read">
          <IconMinus size={25} strokeWidth="1.6" onClick={handleRemove} />
        </Tooltip>
        &nbsp;&nbsp;
        <IconThumbUp size={22} strokeWidth="1.2" />
        &nbsp;&nbsp;
        <Link href={`${Patch.author}/${userId}`} className={styles.user}>
          {userName}
        </Link>
        &nbsp;
        <span>{message}</span>
        &nbsp;
        <Link href={`${Patch.post}/${postId}`} className={styles.title}>
          {postTitle}
        </Link>
      </div>
    );
  }

  if (type === 'dislike') {
    return (
      <div className={styles.notificationItem}>
        <Tooltip label="mark as read">
          <IconMinus size={25} strokeWidth="1.6" onClick={handleRemove} />
        </Tooltip>
        &nbsp;&nbsp;
        <IconThumbUpOff size={22} strokeWidth="1.2" />
        &nbsp;&nbsp;
        <Link href={`${Patch.author}/${userId}`} className={styles.user}>
          {userName}
        </Link>
        &nbsp;&nbsp;
        <span>{message}</span>
        &nbsp;&nbsp;
        <Link href={`${Patch.post}/${postId}`} className={styles.title}>
          {postTitle}
        </Link>
      </div>
    );
  }

  if (type === 'follow' || type === 'unfollow') {
    return (
      <div className={styles.notificationItem}>
        <Tooltip label="mark as read">
          <IconMinus size={25} strokeWidth="1.6" onClick={handleRemove} />
        </Tooltip>
        &nbsp;&nbsp;
        {type === 'follow' ? (
          <IconUserPlus size={25} strokeWidth="1.6" onClick={handleRemove} />
        ) : (
          <IconUserOff size={25} strokeWidth="1.6" onClick={handleRemove} />
        )}
        &nbsp;&nbsp;
        <Link href={`${Patch.author}/${userId}`} className={styles.user}>
          {userName}
        </Link>
        &nbsp;&nbsp;
        <span>{message}</span>
      </div>
    );
  }

  if (type === 'comment') {
    return (
      <div className={styles.notificationItem}>
        <Tooltip label="mark as read">
          <IconMinus size={25} strokeWidth="1.6" onClick={handleRemove} />
        </Tooltip>
        &nbsp;&nbsp;
        <IconMessageDots size={22} strokeWidth="1.2" />
        &nbsp;&nbsp;
        <span>You`r post </span>
        &nbsp;&nbsp;
        <Link href={`${Patch.post}/${postId}`} className={styles.title}>
          {postTitle}
        </Link>
        &nbsp;&nbsp;
        <span>{`${message}:`}</span>
        &nbsp;&nbsp;
        <span className={styles.comment}>{`"${comment}"`}</span>
      </div>
    );
  }

  return <></>;
};

export default Notification;
