import { RichTextEditor } from '@mantine/tiptap';
import { IconPhotoPlus } from '@tabler/icons-react';
import { Editor } from '@tiptap/react';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { notifications } from '@mantine/notifications';
import { createStyles } from '@mantine/core';
import { ErrorMessages } from '@/constants/common.constants';
import { useSaveImageForPostMutation } from '@/redux/services/postsApi';
import YoutubeButton from '../YoutubeButton/YoutubeButton';
import styles from './postContentCreator.module.scss';

const useStyles = createStyles((theme) => ({
  root: {
    width: '100%',
  },
  toolbar: {
    border: 'none',
    width: '100%',
    button: {
      width: '2rem',
      height: '2rem',

      '&[data-active]': {
        backgroundColor: theme.colors.brand[3],
        color: '#fff',
      },

      svg: {
        width: '1.7rem',
        height: '1.7rem',
        strokeWidth: '1.2',
      },
    },
  },
  content: {
    width: 'content',
    display: 'flex',
    backgroundColor: 'inherit',
    fontSize: '1.6rem',

    '& p': {
      color: 'silver',
    },
    img: {
      maxWidth: '90%',
      display: 'block',
      margin: '1rem auto',
    },
    '& [data-youtube-video]': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 0,
      width: '100%',
    },
    iframe: {
      width: '480px',
      height: '360px',

      '@media (max-width: 700px)': {
        width: '280px',
        height: '210px',
      },

      '@media (max-width: 420px)': {
        width: '220px',
        height: '165px',
      },
    },
    hr: {
      width: '20%',
      textAlign: 'center',
    },
    pre: {
      color: '#fff',
      backgroundColor: '#000',

      code: {
        fontSize: '1.4rem',
        fontFamily: 'source-code-pro,Menlo,Monaco,"Courier New",Courier,monospace',
      },
    },
  },
}));

interface IPostContentCreatorProps {
  editor: Editor | null;
  setImages: Dispatch<SetStateAction<string[]>>;
  images: string[];
}

const PostContentCreator = ({
  editor,
  images,
  setImages,
}: IPostContentCreatorProps): JSX.Element => {
  const { classes } = useStyles();
  const [image, setImage] = useState('');
  const [saveImageForPost, resultSave] = useSaveImageForPostMutation();

  const saveImage = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    setImage(e.target.value);
    const file = e.currentTarget.files as unknown as FileList;
    const form = new FormData();
    form.append('image', file[0] as unknown as Blob);
    await saveImageForPost(form);
  };

  useEffect(() => {
    const { isError, data } = resultSave;

    if (isError) {
      notifications.show({
        message: ErrorMessages.errorLoadingImage,
        color: 'red',
        autoClose: 2000,
        withBorder: true,
        styles: () => ({
          description: { fontSize: '1.4rem' },
        }),
      });
    }

    if (data) {
      editor?.chain().focus().setImage({ src: data }).run();
      setImages([...images, data]);
    }
  }, [resultSave]);

  return (
    <RichTextEditor editor={editor} className={classes.root}>
      <RichTextEditor.Toolbar sticky stickyOffset={60} className={classes.toolbar}>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.ClearFormatting />
          <RichTextEditor.Highlight />
          <RichTextEditor.CodeBlock />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H2 />
          <RichTextEditor.H3 />
          <RichTextEditor.H4 />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Blockquote />
          <RichTextEditor.Hr />
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
          <RichTextEditor.Subscript />
          <RichTextEditor.Superscript />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link />
          <label className={styles.labelImage} title="add image">
            <IconPhotoPlus size={15} strokeWidth="1.2" />
            <input
              type="file"
              value={image}
              accept={'.jpg,.jpeg,.png, .webp'}
              onChange={(e): Promise<void> => saveImage(e)}
            />
          </label>
          <YoutubeButton editor={editor} />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content className={classes.content} />
    </RichTextEditor>
  );
};

export default PostContentCreator;
