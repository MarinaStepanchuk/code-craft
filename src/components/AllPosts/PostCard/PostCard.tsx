'use client';

import { IPostWithUser } from '@/types/interfaces';
import Image from 'next/image';
import defaultBanner from '@/assets/default_banner.png';
import getFirstParagraph from '@/utils/getFirstParagraph';
import PostCardHeader from '@/components/PostCardHeader/PostCardHeader';
import { Patch } from '@/constants/common.constants';
import { forwardRef } from 'react';
import Link from 'next/link';
import styles from './PostCard.module.scss';

// eslint-disable-next-line react/display-name
const PostCard = forwardRef<HTMLElement, { card: IPostWithUser }>(({ card }, ref): JSX.Element => {
  const { id, title, banner, content } = card;

  return (
    <article className={styles.container} ref={ref}>
      <Link href={`${Patch.post}/${id}`}>
        <div className={styles.bannerContainer}>
          <Image
            src={banner || defaultBanner}
            fill
            quality={100}
            style={{ borderRadius: '1rem' }}
            alt="post banner"
          />
        </div>
      </Link>

      <div className={styles.contentContainer}>
        <PostCardHeader card={card} />
        <Link href={`${Patch.post}/${id}`}>
          <div className={styles.postContainer}>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.content}>{getFirstParagraph(content || '')}</div>
          </div>
        </Link>
      </div>
    </article>
  );
});

export default PostCard;
