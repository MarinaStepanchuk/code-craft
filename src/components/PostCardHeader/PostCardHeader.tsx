import { IPostWithUser } from '@/types/interfaces';
import Image from 'next/image';
import getFormattedDate from '@/utils/getFormattedDate';
import Bookmark from '@/components/Bookmark/Bookmark';
import { Patch } from '@/constants/common.constants';
import Link from 'next/link';
import { useAppSelector } from '@/hooks/redux';
import { amatic } from '@/app/layout';
import getNameFromEmail from '@/utils/getNameFromEmail';
import styles from './postCardHeader.module.scss';

const PostCardHeader = ({ card }: { card: IPostWithUser }): JSX.Element => {
  const { id, updatedDate, user: author } = card;
  const { user } = useAppSelector((state) => state.userReducer);

  return (
    <div className={styles.userInfo}>
      <Link href={`${Patch.author}/${author.id}`}>
        {author.avatarUrl ? (
          <div className={styles.containerIcon}>
            <Image
              src={author.avatarUrl}
              fill
              alt="user photo"
              style={{ cursor: 'pointer', borderRadius: '50%' }}
            />
          </div>
        ) : (
          <div className={styles.userIcon}>
            {author.name?.at(0)?.toUpperCase() || author.email.at(0)?.toUpperCase()}
          </div>
        )}
      </Link>
      <div>
        <p className={`${amatic.className} ${styles.name}`}>
          {author.name || getNameFromEmail(author.email)}
        </p>
        <p>{getFormattedDate(updatedDate)}</p>
      </div>
      {author.id !== user.id && <Bookmark postId={id} />}
    </div>
  );
};

export default PostCardHeader;
