'use client';

import { IPostWithUser } from '@/types/interfaces';
import Image from 'next/image';
import defaultBanner from '@/assets/default_banner.png';
import getFirstParagraph from '@/utils/getFirstParagraph';
import PostCardHeader from '@/components/PostCardHeader/PostCardHeader';
import { useRouter } from 'next/navigation';
import { Patch } from '@/constants/common.constants';
import styles from './PostCard.module.scss';

const PostCard = ({ card }: { card: IPostWithUser }): JSX.Element => {
  const { id, title, banner, content } = card;
  const { push } = useRouter();

  const readPost = (): void => {
    push(`${Patch.post}/${id}`);
  };

  return (
    <article className={styles.container}>
      <div className={styles.bannerContainer} onClick={readPost}>
        <Image
          src={banner || defaultBanner}
          width={180}
          height={180}
          quality={100}
          style={{ objectFit: 'cover', borderRadius: '1rem' }}
          alt="post banner"
        />
      </div>
      <div className={styles.contentContainer}>
        <PostCardHeader card={card} />
        <div className={styles.postContainer} onClick={readPost}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.content}>{getFirstParagraph(content || '')}</div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
