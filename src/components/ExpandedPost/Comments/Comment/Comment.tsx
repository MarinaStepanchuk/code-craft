import { IComment } from '@/types/interfaces';
import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import getNameFromEmail from '@/utils/getNameFromEmail';
import { ActiveComment } from '@/types/types';
import { useAppSelector } from '@/hooks/redux';
// eslint-disable-next-line camelcase
import { Amatic_SC } from 'next/font/google';
import getFormattedDate from '@/utils/getFormattedDate';
import styles from './comment.module.scss';
import CommentsForm from '../CommentsForm/CommentsForm';

const amatic = Amatic_SC({ subsets: ['latin'], weight: '400' });

interface ICommentProps {
  key: number;
  comment: IComment;
  replies: IComment[];
  activeComment: ActiveComment | null;
  setActiveComment: Dispatch<SetStateAction<ActiveComment | null>>;
  addComment: (message: string, parentId?: number | null) => Promise<void>;
  updateComment: (message: string, id: number) => Promise<void>;
  deleteComment: (id: number) => Promise<void>;
  parentId?: number;
}

const Comment = ({
  comment,
  replies,
  activeComment,
  setActiveComment,
  addComment,
  updateComment,
  deleteComment,
  parentId,
}: ICommentProps): JSX.Element => {
  const { id, message: text, createdDate, user } = comment;
  const { id: userId } = useAppSelector((state) => state.userReducer.user);
  const { user: creatorPost } = useAppSelector((state) => state.postReducer.post);
  const isEditing = activeComment && activeComment.id === id && activeComment.type === 'editing';
  const isReplying = activeComment && activeComment.id === id && activeComment.type === 'replying';
  const canDelete = userId === user.id;
  const canReply = !!userId;
  const canEdit = userId === user.id;
  const replyId = parentId || id;

  return (
    <div className={styles.comment}>
      <div className={styles.avatar}>
        {user.avatarUrl ? (
          <Image
            src={user.avatarUrl}
            width={60}
            height={60}
            alt="author photo"
            style={{ borderRadius: '50%' }}
          />
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
          <p className={styles.date}>{getFormattedDate(createdDate)}</p>
        </div>
        {user.id === creatorPost.id && <p className={styles.author}>author</p>}
        {!isEditing && <p className={styles.message}>{text}</p>}
        {isEditing && (
          <CommentsForm
            label="UPDATE"
            hasCancelButton
            initialText={text}
            handleSubmit={async (message): Promise<void> => {
              await updateComment(message, id);
            }}
            handleCancel={(): void => {
              setActiveComment(null);
            }}
          />
        )}
        <div className={styles.actions}>
          {canReply && (
            <>
              <div
                className={styles.action}
                onClick={(): void => {
                  setActiveComment({ id, type: 'replying' });
                }}
              >
                REPLY
              </div>
              <div className={styles.dot}></div>
            </>
          )}
          {canEdit && (
            <div
              className={styles.action}
              onClick={(): void => {
                setActiveComment({ id, type: 'editing' });
              }}
            >
              EDIT
            </div>
          )}
          {canDelete && (
            <>
              <div className={styles.dot}></div>
              <div
                className={styles.action}
                onClick={async (): Promise<void> => {
                  await deleteComment(id);
                }}
              >
                DELETE
              </div>
            </>
          )}
        </div>
        {isReplying && (
          <CommentsForm
            label="REPLY"
            handleSubmit={async (message): Promise<void> => {
              await addComment(message, replyId);
            }}
          />
        )}
        {replies.length > 0 && (
          <div className={styles.replies}>
            {replies.map((reply) => (
              <Comment
                comment={reply}
                key={reply.id}
                activeComment={activeComment}
                setActiveComment={setActiveComment}
                addComment={addComment}
                updateComment={updateComment}
                deleteComment={deleteComment}
                replies={[]}
                parentId={id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
