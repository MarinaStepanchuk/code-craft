import { IComment } from '@/types/interfaces';
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
import Comment from './Comment/Comment';
import CommentsForm from './CommentsForm/CommentsForm';
import styles from './comments.module.scss';

const Comments = (): JSX.Element => {
  const [activeComment, setActiveComment] = useState<ActiveComment | null>(null);
  const { id: postId } = useAppSelector((state) => state.postReducer.post);
  const { id: userId } = useAppSelector((state) => state.userReducer.user);
  const {
    data: comments = [],
    isLoading: isLoadingComments,
    isError: isErrorComments,
  } = useGetAllCommentsQuery(postId);
  const [createCommentItem, resultCreateComment] = useCreateCommentMutation();
  const [updateCommentItem, resultUpdateComment] = useUpdateCommentMutation();
  const [deleteCommentItem, resultDeleteComment] = useDeleteCommentMutation();

  const getReplies = (commentId: number): IComment[] =>
    comments
      .filter((comment) => comment.parentId === commentId)
      .sort(
        (dateA, dateB) =>
          new Date(dateA.createdDate).getTime() - new Date(dateB.createdDate).getTime()
      );

  const addComment = async (message: string, parentId: number | null = null): Promise<void> => {
    await createCommentItem({ message, parentId, postId, userId });
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

  if (isErrorComments) {
    return <p>Error</p>;
  }

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
            />
          ))}
      </div>
    </div>
  );
};

export default Comments;
