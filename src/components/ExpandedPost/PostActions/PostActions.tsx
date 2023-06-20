import Bookmark from '@/components/Bookmark/Bookmark';
import { IconThumbUp } from '@tabler/icons-react';
import ShareLinkButton from '@/components/ShareLinkButton/ShareLinkButton';
import { ErrorMessages, Patch } from '@/constants/common.constants';
import { useAppSelector } from '@/hooks/redux';
import Link from 'next/link';
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

import getFirstParagraph from '@/utils/getFirstParagraph';
import styles from './postActions.module.scss';

const PostActions = ({ data }: { data: IPostWithUser }): JSX.Element => {
  const { id, title, content, user: author } = data;
  const url = `${Patch.post}/${id}`;
  const text = `${getFirstParagraph(content as string).slice(0, 150)}...`;
  const { status } = useSession();
  const { user } = useAppSelector((state) => state.userReducer);
  const [addLike, resultAddLike] = useAddLikeMutation();
  const [removeLike, resultRemoveLike] = useRemoveLikeMutation();
  const { data: countLikes } = useGetLikesQuery(data.id);
  const { data: isLiked = false } = useCheckLikeQuery({ userId: user.id, postId: data.id });

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
        <ShareLinkButton text={text} url={url} title={title as string} />
      </div>
      <div className={styles.actionsBlock}>
        <Link href={`${Patch.author}/${author.id}`} className={styles.aboutButton}>
          ABOUT AUTHOR
        </Link>
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
