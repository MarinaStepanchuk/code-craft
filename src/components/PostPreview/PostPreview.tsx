import { IPostWithUser } from '@/types/interfaces';
import Image from 'next/image';
import Link from 'next/link';
import { Patch } from '@/constants/common.constants';
import getNameFromEmail from '@/utils/getNameFromEmail';
import { amatic } from '@/app/layout';
import styles from './postPreview.module.scss';

const PostPreview = ({ post }: { post: IPostWithUser }): JSX.Element => {
  const { id, title, user: author } = post;
  const { email, name, avatarUrl } = author;

  return (
    <Link href={`${Patch.post}/${id}`} className={styles.linkContainer}>
      <article className={styles.post}>
        <div className={styles.user}>
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              width={35}
              height={35}
              alt="user photo"
              style={{ cursor: 'pointer', borderRadius: '50%' }}
            />
          ) : (
            <div className={styles.userIcon}>
              {author.name?.at(0)?.toUpperCase() || author.email.at(0)?.toUpperCase()}
            </div>
          )}
          <span className={`${amatic.className} ${styles.name}`}>
            {name || getNameFromEmail(email)}
          </span>
        </div>
        <p>{title}</p>
      </article>
    </Link>
  );
};

export default PostPreview;
