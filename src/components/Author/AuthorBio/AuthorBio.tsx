'use client';

import { IUser } from '@/types/interfaces';
import Image from 'next/image';
import Link from 'next/link';
import { IconBrandInstagram, IconBrandTwitter } from '@tabler/icons-react';
import { useGetSubscribersQuery } from '@/redux/services/subscribersApi';

import getNameFromEmail from '@/utils/getNameFromEmail';
import { amatic } from '@/app/layout';
import { useGetUserByIdQuery } from '@/redux/services/userApi';
import styles from './authorBio.module.scss';
import EmailButton from '../../EmailButton/EmailButton';
import FollowButton from '../../FollowButton/FollowButton';

const AuthorBio = ({ userId, postsCount }: { userId: string; postsCount: number }): JSX.Element => {
  const { data: author, isLoading } = useGetUserByIdQuery(userId);
  const defaultValue = {
    subscribers: [],
    page: 0,
    amountPages: 0,
    amountSubscribers: 0,
  };
  const { data: subscribersData = defaultValue } = useGetSubscribersQuery({
    author: userId,
    page: 0,
  });

  if (isLoading) {
    return <></>;
  }

  return (
    <section className={styles.bioWrapper}>
      <div className={styles.authorWrapper}>
        <div className={styles.authorPhotoContainer}>
          {author?.avatarUrl ? (
            <Image
              src={author.avatarUrl}
              width={100}
              height={100}
              alt="author photo"
              style={{ borderRadius: '50%' }}
            />
          ) : (
            <div className={styles.userIcon}>
              {author?.name?.at(0)?.toUpperCase() || author?.email.at(0)?.toUpperCase()}
            </div>
          )}
        </div>
      </div>
      <div className={styles.bioContainer}>
        <div className={styles.flexContainerNameFollow}>
          <p className={`${styles.name} ${amatic.className}`}>
            {author?.name || getNameFromEmail(author?.email || '')}
          </p>
          <FollowButton authorId={userId} />
        </div>
        <p className={styles.bio}>{author?.bio}</p>
        <div className={styles.contacts}>
          Contact me:
          {author?.twitter && (
            <Link href={author?.twitter} target="_blank" className={styles.link}>
              <IconBrandTwitter size="1.8rem" strokeWidth="1.2" />
            </Link>
          )}
          <EmailButton email={author?.email || ''} mail={author?.mail} />
          {author?.instagram && (
            <Link href={author?.instagram} target="_blank" className={styles.link}>
              <IconBrandInstagram size="1.8rem" strokeWidth="1.2" />
            </Link>
          )}
        </div>
        <div className={styles.statisticContainer}>
          <p className={styles.statisticItem}>Followers : {subscribersData.amountSubscribers}</p>
          <div className={styles.divider}></div>
          <p className={styles.statisticItem}>Posts : {postsCount}</p>
        </div>
      </div>
    </section>
  );
};

export default AuthorBio;
