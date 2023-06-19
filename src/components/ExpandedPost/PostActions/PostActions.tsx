import Bookmark from '@/components/Bookmark/Bookmark';
import { IconThumbUp } from '@tabler/icons-react';
import ShareLinkButton from '@/components/ShareLinkButton/ShareLinkButton';
import { ErrorMessages, Patch } from '@/constants/common.constants';
import { useAppSelector } from '@/hooks/redux';
import { useRouter } from 'next/navigation';
import {
  useAddLikeMutation,
  useCheckLikeQuery,
  useGetLikesQuery,
  useRemoveLikeMutation,
} from '@/redux/services/likeApi';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { IPostWithUser } from '@/types/interfaces';
import { notifications } from '@mantine/notifications';

import styles from './postActions.module.scss';

const PostActions = ({ data }: { data: IPostWithUser }): JSX.Element => {
  const { id, user: author } = data;
  const { status } = useSession();
  const { user } = useAppSelector((state) => state.userReducer);
  const { push } = useRouter();
  const [addLike, resultAddLike] = useAddLikeMutation();
  const [removeLike, resultRemoveLike] = useRemoveLikeMutation();
  const { data: countLikes } = useGetLikesQuery(data.id);
  const { data: isLiked = false } = useCheckLikeQuery({ userId: user.id, postId: data.id });

  const goToAuthorPage = (): void => {
    push(`${Patch.author}/${author.id}`);
  };

  const handleLike = async (): Promise<void> => {
    if (isLiked) {
      await removeLike({ userId: user.id, postId: id });
    } else {
      await addLike({ userId: user.id, postId: id });
    }
  };

  useEffect(() => {
    if (resultAddLike.isError || resultRemoveLike.isError) {
      notifications.show({
        message: ErrorMessages.unknown,
        color: 'red',
        autoClose: 3000,
        withBorder: true,
        styles: () => ({
          description: { fontSize: '1.4rem' },
        }),
      });
    }
  }, [resultAddLike.isError, resultRemoveLike.isError]);

  return (
    <div className={styles.actionsBlock}>
      <div className={styles.actionsBlock}>
        {author.id !== user.id && <Bookmark postId={id} />}
        <ShareLinkButton />
      </div>
      <div className={styles.actionsBlock}>
        <button className={styles.aboutButton} onClick={goToAuthorPage}>
          ABOUT AUTHOR
        </button>
        <button
          className={styles.likeButton}
          onClick={handleLike}
          disabled={status !== 'authenticated'}
        >
          <IconThumbUp
            size={23}
            strokeWidth="1.2"
            className={isLiked && status === 'authenticated' ? styles.like : ''}
          />
          <span>{countLikes || ''}</span>
        </button>
      </div>
    </div>
  );
};

export default PostActions;
