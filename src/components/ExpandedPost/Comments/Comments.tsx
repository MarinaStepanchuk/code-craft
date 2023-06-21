import { IComment, IPostWithUser } from '@/types/interfaces';
import { useEffect, useState } from 'react';
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useGetAllCommentsQuery,
  useUpdateCommentMutation,
} from '@/redux/services/commentsApi';
import { useAppSelector } from '@/hooks/redux';
import Preloader from '@/components/Preloader/Preloader';
import { ActiveComment } from '@/types/types';
import { notifications } from '@mantine/notifications';
import { ErrorMessages } from '@/constants/common.constants';
import createNotificationMessage from '@/utils/createNotificationMessage';
import { useCreateNotificationMutation } from '@/redux/services/notificationApi';
import Comment from './Comment/Comment';
import CommentsForm from './CommentsForm/CommentsForm';
import styles from './comments.module.scss';

const Comments = ({ data }: { data: IPostWithUser }): JSX.Element => {
  const [activeComment, setActiveComment] = useState<ActiveComment | null>(null);
  const { id: userId } = useAppSelector((state) => state.userReducer.user);
  const {
    data: comments = [],
    isLoading: isLoadingComments,
    isError: isErrorComments,
  } = useGetAllCommentsQuery(data.id);
  const [createCommentItem, resultCreateComment] = useCreateCommentMutation();
  const [updateCommentItem, resultUpdateComment] = useUpdateCommentMutation();
  const [deleteCommentItem, resultDeleteComment] = useDeleteCommentMutation();
  const [createNotification] = useCreateNotificationMutation();

  const getReplies = (commentId: number): IComment[] =>
    comments
      .filter((comment) => comment.parentId === commentId)
      .sort(
        (dateA, dateB) =>
          new Date(dateA.createdDate).getTime() - new Date(dateB.createdDate).getTime()
      );

  const addComment = async (message: string, parentId: number | null = null): Promise<void> => {
    await createCommentItem({ message, parentId, postId: data.id, userId });
    const messageNotification = createNotificationMessage({
      type: 'comment',
      postId: data.id,
      postTitle: data.title as string,
      comment: message,
    });
    await createNotification({ userId, message: messageNotification });
    setActiveComment(null);
  };

  const updateComment = async (message: string, id: number): Promise<void> => {
    await updateCommentItem({ message, id });
    setActiveComment(null);
  };

  const deleteComment = async (id: number): Promise<void> => {
    await deleteCommentItem(id);
    setActiveComment(null);
  };

  useEffect(() => {
    if (resultCreateComment.isError || resultUpdateComment.isError || resultDeleteComment.isError) {
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
  }, [resultCreateComment, resultUpdateComment, resultDeleteComment, isErrorComments]);

  return (
    <div className={styles.comments}>
      <CommentsForm label="WRITE" handleSubmit={addComment} />
      {isLoadingComments && <Preloader width="5rem" height="5rem" color="#05386b" />}
      <div className={styles.commentsContainer}>
        {comments
          .filter((comment) => comment.parentId === null)
          .map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              replies={getReplies(comment.id)}
              activeComment={activeComment}
              setActiveComment={setActiveComment}
              addComment={addComment}
              updateComment={updateComment}
              deleteComment={deleteComment}
              authorPostId={data.user.id}
            />
          ))}
      </div>
    </div>
  );
};

export default Comments;
