import { Textarea, createStyles } from '@mantine/core';
import { FormEvent, useState } from 'react';
import styles from './commentsForm.module.scss';

const useStyles = createStyles(() => ({
  title: {
    width: '100%',
    borderBottom: '1px solid #b5aeae',

    textarea: {
      border: 'none',
      outline: 'none',
      fontSize: '1.4rem',
      color: '#212832',
      fontWeight: 'bold',
    },
  },
}));

type CommentFormLabels = 'WRITE' | 'UPDATE' | 'REPLY';

interface ICommentsFormProps {
  label: CommentFormLabels;
  handleSubmit: (message: string, parentId?: number | null) => Promise<void>;
  hasCancelButton?: boolean;
  handleCancel?: () => void;
  initialText?: string;
}

const CommentsForm = ({
  label,
  handleSubmit,
  hasCancelButton = false,
  handleCancel,
  initialText = '',
}: ICommentsFormProps): JSX.Element => {
  const [message, setMessage] = useState(initialText);
  const { classes } = useStyles();

  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    handleSubmit(message);
    setMessage('');
  };
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <Textarea
        placeholder="Your comment..."
        withAsterisk
        value={message}
        autosize
        onChange={(e): void => setMessage(e.target.value)}
        className={classes.title}
      />
      <div className={styles.formActions}>
        <button disabled={message.length === 0} className={styles.formButton}>
          {label}
        </button>
        {hasCancelButton && (
          <button onClick={handleCancel} className={styles.formButton}>
            CANCEL
          </button>
        )}
      </div>
    </form>
  );
};

export default CommentsForm;
