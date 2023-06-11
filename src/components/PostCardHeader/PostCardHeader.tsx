import { IUser } from '@/types/interfaces';
import Image from 'next/image';
import getFormattedDate from '@/utils/getFormattedDate';
import Bookmark from '@/components/Bookmark/Bookmark';
import { Patch } from '@/constants/common.constants';
import { useRouter } from 'next/navigation';
import styles from './postCardHeader.module.scss';

const PostCardHeader = ({ user, updatedDate }: { user: IUser; updatedDate: Date }): JSX.Element => {
  const { push } = useRouter();

  const goToAuthorPage = (): void => {
    push(`${Patch.author}/${user.id}`);
  };

  return (
    <div className={styles.userInfo}>
      {user.avatarUrl ? (
        <Image
          src={user.avatarUrl}
          width={40}
          height={40}
          alt="user photo"
          onClick={goToAuthorPage}
          style={{ cursor: 'pointer', borderRadius: '50%' }}
        />
      ) : (
        <div className={styles.userIcon} onClick={goToAuthorPage}>
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
