import { IUser } from '@/types/interfaces';
import Image from 'next/image';
import Link from 'next/link';
// eslint-disable-next-line camelcase
import { Amatic_SC } from 'next/font/google';
import { IconBrandInstagram, IconBrandTwitter } from '@tabler/icons-react';
import getNameFromEmail from '@/utils/getNameFromEmail';
import styles from './authorBio.module.scss';
import EmailButton from '../../EmailButton/EmailButton';
import FollowButton from '../../FollowButton/FollowButton';

const amatic = Amatic_SC({ subsets: ['latin'], weight: '400' });

const AuthorBio = ({
  user: author,
  postsCount,
}: {
  user: IUser;
  postsCount: number;
}): JSX.Element => {
  const { name, bio, avatarUrl, email, mail, twitter, instagram, id } = author;

  return (
    <section className={styles.bioWrapper}>
      <div className={styles.authorWrapper}>
        <div className={styles.authorPhotoContainer}>
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              width={100}
              height={100}
              alt="author photo"
              style={{ borderRadius: '50%' }}
            />
          ) : (
            <div className={styles.userIcon}>
              {name?.at(0)?.toUpperCase() || email.at(0)?.toUpperCase()}
            </div>
          )}
        </div>
      </div>
      <div className={styles.bioContainer}>
        <div className={styles.flexContainerNameFollow}>
          <p className={`${styles.name} ${amatic.className}`}>{name || getNameFromEmail(email)}</p>
          <FollowButton authorId={id} />
        </div>
        <p className={styles.bio}>{bio}</p>
        <div className={styles.contacts}>
          Contact me:
          {twitter && (
            <Link href={twitter} target="_blank" className={styles.link}>
              <IconBrandTwitter size="1.8rem" strokeWidth="1.2" />
            </Link>
          )}
          <EmailButton email={email} mail={mail} />
          {instagram && (
            <Link href={instagram} target="_blank" className={styles.link}>
              <IconBrandInstagram size="1.8rem" strokeWidth="1.2" />
            </Link>
          )}
        </div>
        <div className={styles.statisticContainer}>
          <p className={styles.statisticItem}>Followers : 0</p>
          <div className={styles.divider}></div>
          <p className={styles.statisticItem}>Posts : {postsCount}</p>
        </div>
      </div>
    </section>
  );
};

export default AuthorBio;
