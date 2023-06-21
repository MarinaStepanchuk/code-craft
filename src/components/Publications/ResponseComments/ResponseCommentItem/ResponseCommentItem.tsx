import Image from 'next/image';
import getNameFromEmail from '@/utils/getNameFromEmail';
import { amatic } from '@/app/layout';
import { useRouter } from 'next/navigation';
import getFormattedDate from '@/utils/getFormattedDate';
import { Patch } from '@/constants/common.constants';
import { IResponseComment } from '@/redux/services/commentsApi';
import { Divider } from '@mantine/core';
import styles from './responseCommentItem.module.scss';

const ResponseCommentItem = ({ comment }: { comment: IResponseComment }): JSX.Element => {
  const { user, updatedDate, createdDate, message, postId, post } = comment;
  const { push } = useRouter();

  const goToPost = (): void => {
    push(`${Patch.post}/${postId}`);
  };

  return (
    <>
      <div className={styles.comment} onClick={goToPost}>
        <div className={styles.avatar}>
          {user.avatarUrl ? (
            <Image src={post.banner} width={60} height={60} alt="author photo" />
          ) : (
            <div className={styles.userIcon}>
              {user.name?.at(0)?.toUpperCase() || user.email.at(0)?.toUpperCase()}
            </div>
          )}
        </div>
        <div className={styles.commentContent}>
          <div className={styles.details}>
            <p className={`${styles.name} ${amatic.className}`}>
              {user.name || getNameFromEmail(user.email)}
            </p>
            <div className={styles.dot}></div>
            {new Date(updatedDate).getTime() !== new Date(createdDate).getTime() && (
              <p className={styles.author}>edited on</p>
            )}
            <p className={styles.date}>{getFormattedDate(createdDate)}</p>
          </div>
          <p className={styles.message}>{message}</p>
        </div>
      </div>
      <Divider size={3} sx={{ width: '100%', margin: '1.5rem auto' }} />
    </>
  );
};

export default ResponseCommentItem;
