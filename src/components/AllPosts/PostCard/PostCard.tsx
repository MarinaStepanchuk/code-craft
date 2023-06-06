import { IPostWithUser } from '@/types/interfaces';
import Image from 'next/image';
import defaultBanner from '@/assets/default_banner.png';
import defaultUserImage from '@/assets/profile_default.png';
import getFirstParagraph from '@/utils/getFirstParagraph';
import styles from './PostCard.module.scss';

const PostCard = ({ card }: { card: IPostWithUser }): JSX.Element => {
  const { post, user } = card;
  return (
    <article className={styles.container}>
      <div className={styles.userContainer}>
        <Image src={user.avatarUrl || defaultUserImage} width={30} height={30} alt="user photo" />
        {user.name && <p>{user.name}</p>}
        <p>{` on ${post.updatedDate}`}</p>
      </div>
      <div className={styles.postContainer}>
        <Image src={post.banner || defaultBanner} width={100} height={100} alt="post banner" />
        <div className={styles.contentContainer}>
          <h3 className={styles.title}>{post.title}</h3>
          <div className={styles.content}>{getFirstParagraph(post.content || '')}</div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
