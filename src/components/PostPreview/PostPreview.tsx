import { IPostWithUser } from '@/types/interfaces';
import Image from 'next/image';

import { useRouter } from 'next/navigation';

import { Patch } from '@/constants/common.constants';
import styles from './postPreview.module.scss';

const PostPreview = ({ post }: { post: IPostWithUser }): JSX.Element => {
  console.log(22222);
  const { id, title, banner, user: author } = post;
  const { email, name, avatarUrl } = author;
  const { push } = useRouter();

  const readPost = (): void => {
    push(`${Patch.post}/${id}`);
  };

  return (
    <article className={styles.post} onClick={readPost}>
      <div>
        {author.avatarUrl ? (
          <Image
            src={author.avatarUrl}
            width={25}
            height={25}
            alt="user photo"
            style={{ cursor: 'pointer', borderRadius: '50%' }}
          />
        ) : (
          <div className={styles.userIcon}>
            {author.name?.at(0)?.toUpperCase() || author.email.at(0)?.toUpperCase()}
          </div>
        )}
        <span>{name}</span>
      </div>
      <p>{title}</p>
      <Image src={banner as string} width={150} height={150} alt="user photo" />
    </article>
  );
};

export default PostPreview;
