import { ISubscriber } from '@/types/interfaces';
import Image from 'next/image';
import FollowButton from '@/components/FollowButton/FollowButton';
// eslint-disable-next-line camelcase
import { Amatic_SC } from 'next/font/google';
import { ErrorMessages, Patch } from '@/constants/common.constants';
import { useRouter } from 'next/navigation';
import getNameFromEmail from '@/utils/getNameFromEmail';
import { notifications } from '@mantine/notifications';
import { useUnsubscribeMutation } from '@/redux/services/subscribersApi';
import { useEffect } from 'react';
import { useAppSelector } from '@/hooks/redux';
import useOutsideClick from '@/hooks/useOutsideClick';
import Modal from '@/components/Modal/Modal';
import styles from './subscriber.module.scss';

const amatic = Amatic_SC({ subsets: ['latin'], weight: '400' });

const Subscriber = ({ subscriber }: { subscriber: ISubscriber }): JSX.Element => {
  const { id, email, name, bio, avatarUrl } = subscriber;
  const { push } = useRouter();
  const [unsubscribe, resultUnsubscribe] = useUnsubscribeMutation();
  const { user } = useAppSelector((state) => state.userReducer);
  const { ref, isActive, setIsActive } = useOutsideClick(false);

  const goToAuthorPage = (): void => {
    push(`${Patch.author}/${id}`);
  };

  const removeSubscriber = async (): Promise<void> => {
    await unsubscribe({
      author: user.id,
      subscriber: id,
    });
  };

  const modalСonfirmation = (
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
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          width={60}
          height={60}
          alt="user photo"
          onClick={goToAuthorPage}
          style={{ cursor: 'pointer', borderRadius: '50%' }}
        />
      ) : (
        <div className={styles.userIcon} onClick={goToAuthorPage}>
          {name?.at(0)?.toUpperCase() || email.at(0)?.toUpperCase()}
        </div>
      )}
      <div onClick={goToAuthorPage} className={styles.description}>
        <p className={`${styles.name} ${amatic.className}`}>{name || getNameFromEmail(email)}</p>{' '}
        {bio && <p className={styles.bio}>{bio}</p>}
      </div>
      <div className={styles.buttonsContainer}>
        <FollowButton authorId={id} />
        <button onClick={(): void => setIsActive(true)}>Remove</button>
      </div>
      {isActive && (
        <Modal setIsActive={setIsActive} ref={ref} isActive={isActive}>
          {modalСonfirmation}
        </Modal>
      )}
    </div>
  );
};

export default Subscriber;
