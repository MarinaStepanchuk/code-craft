import { ISubscriber, IUser } from '@/types/interfaces';
import FollowButton from '@/components/FollowButton/FollowButton';
import { ErrorMessages } from '@/constants/common.constants';
import { notifications } from '@mantine/notifications';
import { useUnsubscribeMutation } from '@/redux/services/subscribersApi';
import { useEffect } from 'react';
import { useAppSelector } from '@/hooks/redux';
import useOutsideClick from '@/hooks/useOutsideClick';
import Modal from '@/components/Modal/Modal';
import UserCard from '@/components/UserCard/UserCard';
import styles from './subscriber.module.scss';

const Subscriber = ({ subscriber }: { subscriber: ISubscriber }): JSX.Element => {
  const { id } = subscriber;
  const [unsubscribe, resultUnsubscribe] = useUnsubscribeMutation();
  const { user } = useAppSelector((state) => state.userReducer);
  const { ref, isActive, setIsActive } = useOutsideClick(false);

  const removeSubscriber = async (): Promise<void> => {
    await unsubscribe({
      author: user.id,
      subscriber: id,
    });
  };

  const modalConfirmation = (
    <div className={styles.confirmation}>
      <p>Are you sure you want to delete a subscriber?</p>
      <div className={styles.confirmationButtons}>
        <button onClick={removeSubscriber}>Yes</button>
        <button onClick={(): void => setIsActive(false)}>Cancel</button>
      </div>
    </div>
  );

  useEffect(() => {
    if (resultUnsubscribe.isError) {
      notifications.show({
        message: ErrorMessages.errorRemoveSubscriber,
        color: 'red',
        autoClose: 3000,
        withBorder: true,
        styles: () => ({
          description: { fontSize: '1.4rem' },
        }),
      });
    }
  }, [resultUnsubscribe.isError]);

  return (
    <div className={styles.subscriber}>
      <UserCard user={subscriber as IUser} />
      <div className={styles.buttonsContainer}>
        <FollowButton authorId={id} />
        <button onClick={(): void => setIsActive(true)}>Remove</button>
      </div>
      {isActive && (
        <Modal setIsActive={setIsActive} ref={ref} isActive={isActive}>
          {modalConfirmation}
        </Modal>
      )}
    </div>
  );
};

export default Subscriber;
