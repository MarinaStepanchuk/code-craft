import { IUser } from '@/types/interfaces';
import Image from 'next/image';
import getFormattedDate from '@/utils/getFormattedDate';
import Bookmark from '@/components/Bookmark/Bookmark';
import styles from './postCardHeader.module.scss';

const PostCardHeader = ({ user, updatedDate }: { user: IUser; updatedDate: Date }): JSX.Element => {
  const showUserPage = (): void => {};

  return (
    <div className={styles.userInfo}>
      {user.avatarUrl ? (
        <Image
          src={user.avatarUrl}
          width={30}
          height={30}
          alt="user photo"
          onClick={showUserPage}
          style={{ cursor: 'pointer' }}
        />
      ) : (
        <div className={styles.userIcon} onClick={showUserPage}>
          {user.name?.at(0)?.toUpperCase() || user.email.at(0)?.toUpperCase()}
        </div>
      )}
      <div>
        <p>{user.name}</p>
        <p>{getFormattedDate(updatedDate)}</p>
      </div>
      <Bookmark />
    </div>
  );
};

export default PostCardHeader;
