import Image from 'next/image';
import getNameFromEmail from '@/utils/getNameFromEmail';
import { useRouter } from 'next/navigation';
import { amatic } from '@/app/layout';
import { IUser } from '@/types/interfaces';
import { Patch } from '@/constants/common.constants';
import styles from './userCard.module.scss';

const UserCard = ({ user }: { user: IUser }): JSX.Element => {
  const { id, email, name, bio, avatarUrl } = user;
  const { push } = useRouter();

  const goToAuthorPage = (): void => {
    push(`${Patch.author}/${id}`);
  };

  return (
    <div className={styles.userContainer} onClick={goToAuthorPage}>
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
};

export default UserCard;
