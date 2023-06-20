import { IPostWithUser } from '@/types/interfaces';
import Image from 'next/image';

import { useRouter } from 'next/navigation';

import { Patch } from '@/constants/common.constants';
import getNameFromEmail from '@/utils/getNameFromEmail';
import styles from './postPreview.module.scss';

const PostPreview = ({ post }: { post: IPostWithUser }): JSX.Element => {
  const { id, title, user: author } = post;
  const { email, name, avatarUrl } = author;
  const { push } = useRouter();

  const readPost = (): void => {
    push(`${Patch.post}/${id}`);
  };

  return (
    <article className={styles.post} onClick={readPost}>
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
        <span>{name || getNameFromEmail(email)}</span>
      </div>
      <p>{title}</p>
      {/* <Image src={banner as string} width={150} height={150} alt="user photo" /> */}
    </article>
  );
};

export default PostPreview;
