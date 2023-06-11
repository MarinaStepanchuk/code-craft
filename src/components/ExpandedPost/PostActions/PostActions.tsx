import Bookmark from '@/components/Bookmark/Bookmark';
import { IconThumbUp } from '@tabler/icons-react';
import ShareLinkButton from '@/components/ShareLinkButton/ShareLinkButton';
import { Patch } from '@/constants/common.constants';
import { useAppDispatch, useAppSelector } from '@/huks/redux';
import { useRouter } from 'next/navigation';
import { useAddLikeMutation, useRemoveLikeMutation } from '@/redux/services/postsApi';
import { useEffect } from 'react';
import { postSlice } from '@/redux/store/reducers/postSlice';
import styles from './postActions.module.scss';

const PostActions = (): JSX.Element => {
  const {
    id,
    user: author,
    isLiked,
    countLikes,
  } = useAppSelector((state) => state.postReducer.post);
  const { user } = useAppSelector((state) => state.userReducer);
  const { push } = useRouter();
  const [addLike, resultAddLike] = useAddLikeMutation();
  const [removeLike, resultRemoveLike] = useRemoveLikeMutation();
  const { updateLike } = postSlice.actions;
  const dispatch = useAppDispatch();

  const goToAuthorPage = (): void => {
    push(`${Patch.author}/${author.id}`);
  };

  const handleLike = (): void => {
    if (isLiked) {
      removeLike({ userId: user.id, postId: id });
    } else {
      addLike({ userId: user.id, postId: id });
    }
  };

  useEffect(() => {
    if (resultAddLike.data) {
      dispatch(updateLike(true));
    }
  }, [resultAddLike]);

  useEffect(() => {
    if (resultRemoveLike.data) {
      dispatch(updateLike(false));
    }
  }, [resultRemoveLike]);

  return (
    <div className={styles.actionsBlock}>
      <div className={styles.actionsBlock}>
        {author.id !== user.id && <Bookmark />}
        <ShareLinkButton />
      </div>
      <div className={styles.actionsBlock}>
        <button className={styles.aboutButton} onClick={goToAuthorPage}>
          ABOUT AUTHOR
        </button>
        <button className={styles.likeButton} onClick={handleLike}>
          <IconThumbUp size={23} strokeWidth="1.2" className={isLiked ? styles.like : ''} />
          <span>{countLikes}</span>
        </button>
      </div>
    </div>
  );
};

export default PostActions;
