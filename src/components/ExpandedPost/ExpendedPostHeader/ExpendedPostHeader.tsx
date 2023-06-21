import Image from 'next/image';
import defaultBanner from '@/assets/default_banner.png';
import getFormattedDate from '@/utils/getFormattedDate';
import { amatic } from '@/app/layout';
import getNameFromEmail from '@/utils/getNameFromEmail';
import { useRouter } from 'next/navigation';
import { Patch } from '@/constants/common.constants';
import { IPostWithUser } from '@/types/interfaces';
import styles from './expendedPostHeader.module.scss';
import PostActions from '../PostActions/PostActions';

const ExpendedPostHeader = ({ data }: { data: IPostWithUser }): JSX.Element => {
  const { title, banner, updatedDate, user } = data;
  const { push } = useRouter();

  const goToAuthorPage = (): void => {
    push(`${Patch.author}/${user.id}`);
  };

  return (
    <header>
      <div className={styles.banner}>
        <Image
          src={banner || defaultBanner}
          alt={title || 'banner post'}
          className={styles.imgBanner}
          fill={true}
          style={{ objectFit: 'cover' }}
        />
        <div className={styles.titleContainer}>
          <h2 className={amatic.className}>{title}</h2>
          <span>{getFormattedDate(updatedDate)}</span>
        </div>
      </div>
      <div className={styles.actions}>
        <div className={styles.actionsBlock}>
          <div className={styles.authorPhotoContainer}>
            {user.avatarUrl ? (
              <Image
                src={user.avatarUrl}
                width={70}
                height={70}
                alt="author photo"
                onClick={goToAuthorPage}
                style={{ cursor: 'pointer', borderRadius: '50%' }}
              />
            ) : (
              <div className={styles.userIcon} onClick={goToAuthorPage}>
                {user.name?.at(0)?.toUpperCase() || user.email.at(0)?.toUpperCase()}
              </div>
            )}
          </div>
          <span className={`${styles.name} ${amatic.className}`} onClick={goToAuthorPage}>
            {user.name || getNameFromEmail(user.email)}
          </span>
        </div>
        <PostActions data={data} />
      </div>
    </header>
  );
};

export default ExpendedPostHeader;
