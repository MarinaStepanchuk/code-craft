import { useAppSelector } from '@/hooks/redux';
import { useGetSubscribersQuery } from '@/redux/services/subscribersApi';
import PaginationContainer from '@/components/PaginationContainer/PaginationContainer';
import { ErrorMessages } from '@/constants/common.constants';
import { notifications } from '@mantine/notifications';
import { useState, useEffect, SetStateAction, Dispatch } from 'react';
import Preloader from '@/components/Preloader/Preloader';
import { Divider } from '@mantine/core';
import Subscriber from '../Subscriber/Subscriber';
import styles from './subscribersList.module.scss';

const SubscribersList = ({
  setSubscribersCount,
}: {
  setSubscribersCount: Dispatch<SetStateAction<number>>;
}): JSX.Element => {
  const defaultValue = {
    subscribers: [],
    page: 0,
    amountPages: 0,
    amountSubscribers: 0,
  };
  const [currentPage, setCurrentPage] = useState(0);
  const { user } = useAppSelector((state) => state.userReducer);
  const {
    data: subscribersData = defaultValue,
    isLoading: isLoadingSubscribers,
    isError: isErrorSubscribers,
  } = useGetSubscribersQuery({ author: user.id, page: currentPage });

  const changePage = (page: number): void => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (subscribersData) {
      setSubscribersCount(subscribersData.amountSubscribers);
    }
    if (isErrorSubscribers) {
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
  }, [subscribersData, isErrorSubscribers]);

  if (isLoadingSubscribers) {
    return <Preloader width="5rem" height="5rem" color="#05386b" />;
  }

  if (!subscribersData.subscribers.length) {
    return <p className={styles.noData}>You don`t have subscribers yet.</p>;
  }

  return (
    <div>
      <PaginationContainer
        onPageClick={changePage}
        amountPages={subscribersData.amountPages}
        page={subscribersData.page}
      >
        {subscribersData.subscribers.map((subscriber) => (
          <>
            <Subscriber key={subscriber.id} subscriber={subscriber} />
            <Divider size={3} style={{ width: '100%' }} />
          </>
        ))}
      </PaginationContainer>
    </div>
  );
};

export default SubscribersList;
