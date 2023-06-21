import Image from 'next/image';
import getNameFromEmail from '@/utils/getNameFromEmail';
import { useRouter } from 'next/navigation';
import { amatic } from '@/app/layout';
import { IUser } from '@/types/interfaces';
import { Patch } from '@/constants/common.constants';
import { forwardRef } from 'react';
import styles from './userCard.module.scss';

// eslint-disable-next-line react/display-name
const UserCard = forwardRef<HTMLElement, { user: IUser }>(({ user }, ref): JSX.Element => {
  const { id, email, name, bio, avatarUrl } = user;
  const { push } = useRouter();

  const goToAuthorPage = (): void => {
    push(`${Patch.author}/${id}`);
  };

  return (
    <div className={styles.userContainer} onClick={goToAuthorPage} ref={ref}>
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          width={60}
          height={60}
          alt="user photo"
          style={{ cursor: 'pointer', borderRadius: '50%' }}
        />
      ) : (
        <div className={styles.userIcon}>
          {name?.at(0)?.toUpperCase() || email.at(0)?.toUpperCase()}
        </div>
      )}
      <div className={styles.description}>
        <p className={`${styles.name} ${amatic.className}`}>{name || getNameFromEmail(email)}</p>{' '}
        {bio && <p className={styles.bio}>{bio}</p>}
      </div>
    </div>
  );
});

export default UserCard;
