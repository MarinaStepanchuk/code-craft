import { IPostWithUser } from '@/types/interfaces';
import Image from 'next/image';
import getFormattedDate from '@/utils/getFormattedDate';
import Bookmark from '@/components/Bookmark/Bookmark';
import { Patch } from '@/constants/common.constants';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/huks/redux';
import styles from './postCardHeader.module.scss';

const PostCardHeader = ({ card }: { card: IPostWithUser }): JSX.Element => {
  const { push } = useRouter();
  const { id, updatedDate, user: author } = card;
  const { user } = useAppSelector((state) => state.userReducer);

  const goToAuthorPage = (): void => {
    push(`${Patch.author}/${author.id}`);
  };

  return (
    <div className={styles.userInfo}>
      {author.avatarUrl ? (
        <Image
          src={author.avatarUrl}
          width={40}
          height={40}
          alt="user photo"
          onClick={goToAuthorPage}
          style={{ cursor: 'pointer', borderRadius: '50%' }}
        />
      ) : (
        <div className={styles.userIcon} onClick={goToAuthorPage}>
          {author.name?.at(0)?.toUpperCase() || author.email.at(0)?.toUpperCase()}
        </div>
      )}
      <div>
        <p>{author.name}</p>
        <p>{getFormattedDate(updatedDate)}</p>
      </div>
      {author.id !== user.id && <Bookmark postId={id} />}
    </div>
  );
};

export default PostCardHeader;
