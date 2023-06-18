import Image from 'next/image';
import getNameFromEmail from '@/utils/getNameFromEmail';
import { useRouter } from 'next/navigation';
// eslint-disable-next-line camelcase
import { Amatic_SC } from 'next/font/google';
import { IUser } from '@/types/interfaces';
import { Patch } from '@/constants/common.constants';
import styles from './userCard.module.scss';

const amatic = Amatic_SC({ subsets: ['latin'], weight: '400' });

const UserCard = ({ user }: { user: IUser }): JSX.Element => {
  const { id, email, name, bio, avatarUrl } = user;
  const { push } = useRouter();

  const goToAuthorPage = (): void => {
    push(`${Patch.author}/${id}`);
  };
  return (
    <div className={styles.userContainer}>
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
    </div>
  );
};

export default UserCard;
