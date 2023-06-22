import { ErrorMessages } from '@/constants/common.constants';
import { useAppSelector } from '@/hooks/redux';
import {
  useGetNotificationsQuery,
  useRemoveAllNotificationMutation,
} from '@/redux/services/notificationApi';
import { IconChecks } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import PaginationContainer from '@/components/PaginationContainer/PaginationContainer';

import { useEffect, useState } from 'react';
import Notification from '../Notification/Notification';
import styles from './notificationList.module.scss';

const NotificationList = (): JSX.Element => {
  const { user } = useAppSelector((state) => state.userReducer);
  const [currentPage, setCurrentPage] = useState(0);
  const [removeAllNotification, resultDeleteComment] = useRemoveAllNotificationMutation();

  const { data: notificationList, isError } = useGetNotificationsQuery({
    userId: user.id,
    page: currentPage,
  });

  const changePage = (page: number): void => {
    setCurrentPage(page);
  };

  const handleRemoveAllNotifications = async (): Promise<void> => {
    await removeAllNotification(user.id);
  };

  useEffect(() => {
    if (isError || resultDeleteComment.isError) {
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
  }, [isError, resultDeleteComment.isError, notificationList]);

  return (
    <div className={styles.notificationWrapper}>
      <span onClick={handleRemoveAllNotifications} className={styles.clearButton}>
        <IconChecks size={25} strokeWidth="1.6" />
        &nbsp; Mark all as read
      </span>
      <PaginationContainer
        onPageClick={changePage}
        amountPages={notificationList?.amountPages || 0}
        page={notificationList?.page || 0}
      >
        <div className={styles.notificationList}>
          {notificationList?.notifications?.map((item) => (
            <Notification notificationMessage={item.message} key={item.id} id={item.id} />
          ))}
        </div>
      </PaginationContainer>
    </div>
  );
};

export default NotificationList;
