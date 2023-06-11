import Bookmark from '@/components/Bookmark/Bookmark';
import { IconThumbUp } from '@tabler/icons-react';
import ShareLinkButton from '@/components/ShareLinkButton/ShareLinkButton';
import { Patch } from '@/constants/common.constants';
import { useAppSelector } from '@/huks/redux';
import { useRouter } from 'next/navigation';
import styles from './postActions.module.scss';

const PostActions = (): JSX.Element => {
  const { user } = useAppSelector((state) => state.postReducer.post);
  const { push } = useRouter();

  const goToAuthorPage = (): void => {
    push(`${Patch.author}/${user.id}`);
  };

  return (
    <div className={styles.actionsBlock}>
      <div className={styles.actionsBlock}>
        <Bookmark />
        <ShareLinkButton />
      </div>
      <div className={styles.actionsBlock}>
        <button className={styles.aboutButton} onClick={goToAuthorPage}>
          ABOUT AUTHOR
        </button>
        <button className={styles.likeButton}>
          <IconThumbUp size={23} strokeWidth="1.2" />
          <span>{'0'}</span>
        </button>
      </div>
    </div>
  );
};

export default PostActions;
