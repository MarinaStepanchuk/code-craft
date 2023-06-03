'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { Divider, createStyles } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import tsLanguageSyntax from 'highlight.js/lib/languages/typescript';
import { ErrorMessages } from '@/constants/common.constants';
import {
  useCreatePostMutation,
  useRemoveUnusedImagesMutation,
  useSaveImageForPostMutation,
} from '@/redux/services/postsApi';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { IconPhotoPlus } from '@tabler/icons-react';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Youtube from '@tiptap/extension-youtube';
import Image from '@tiptap/extension-image';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { lowlight } from 'lowlight';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/huks/redux';
import PostTags from '../PostTags/PostTags';
import PostHeader from '../PostHeader/PostHeader';
import styles from './postCreator.module.scss';
import YoutubeButton from '../YoutubeButton/YoutubeButton';

lowlight.registerLanguage('ts', tsLanguageSyntax);

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

const PostCreator = (): JSX.Element => {
  const [banner, setBanner] = useState<string | File>('');
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState<Array<string>>([]);
  const [images, setImages] = useState<Array<string>>([]);
  const { classes } = useStyles();
  const [saveImageForPost, resultSave] = useSaveImageForPostMutation();
  const [removeUnusedImages] = useRemoveUnusedImagesMutation();
  const [createPost, resultCreatePost] = useCreatePostMutation();
  const [image, setImage] = useState('');
  const [sendingInProgress, setSendingInProgress] = useState(false);
  const { push } = useRouter();
  const { user } = useAppSelector((state) => state.userReducer);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Image.configure({
        HTMLAttributes: {
          alt: 'post image',
        },
      }),
      Highlight,
      Youtube.configure({
        progressBarColor: 'white',
      }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder: 'Start your post' }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: '',
  });

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

  useEffect(() => {
    const { isError, data } = resultCreatePost;

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
      push('/');
    }
  }, [resultCreatePost]);

  const validationPost = (contentPost: string): Array<string> => {
    const errors = [];

    if (!banner) {
      errors.push(ErrorMessages.post.errorBanner);
    }

    if (!title) {
      errors.push(ErrorMessages.post.errorTitle);
    }

    if (contentPost.length < 100) {
      errors.push(ErrorMessages.post.errorContent);
    }

    if (!tags.length) {
      errors.push(ErrorMessages.post.errorTags);
    }

    return errors;
  };

  const sendPost = async (): Promise<void> => {
    setSendingInProgress(true);
    const contentPost = editor?.getHTML();
    const errors = validationPost(contentPost || '');

    if (errors.length > 0) {
      errors.forEach((error) => {
        notifications.show({
          message: error,
          color: 'red',
          autoClose: 2000,
          withBorder: true,
          styles: () => ({
            description: { fontSize: '1.4rem' },
          }),
        });
      });
      setTimeout(() => {
        setSendingInProgress(false);
      }, 3000);
      return;
    }

    const newImage: Array<string> = [];
    const removeImages = images
      .filter((item) => {
        const url = item.split('?alt=media')[0].split('%2F')[1];
        if (contentPost?.includes(url)) {
          newImage.push(item);
          return false;
        }
        return true;
      })
      .map((item) => item.split('?alt=media')[0].split('%2F')[1]);
    await removeUnusedImages(removeImages);
    setImages(newImage);

    const form = new FormData();
    form.append('creatorId', user.id);
    form.append('title', title);
    form.append('content', contentPost || '');
    form.append('tags', JSON.stringify(tags));
    form.append('date', JSON.stringify(new Date()));
    form.append('published', JSON.stringify(true));

    if (banner) form.append('banner', banner as unknown as Blob);

    await createPost(form);
    setSendingInProgress(false);
  };

  const saveDraft = async (): Promise<void> => {
    setSendingInProgress(true);
    const contentPost = editor?.getHTML();

    const form = new FormData();
    form.append('creatorId', user.id);
    form.append('title', title || 'Title');
    form.append('content', contentPost || '');
    form.append('tags', tags ? JSON.stringify(tags) : '');
    form.append('date', JSON.stringify(new Date()));
    form.append('published', JSON.stringify(false));

    if (banner) form.append('banner', banner as unknown as Blob);

    await createPost(form);
    setSendingInProgress(false);
  };

  return (
    <section className={styles.creator}>
      <PostHeader setBanner={setBanner} title={title} setTitle={setTitle} />
      <Divider size={10} sx={{ width: '30%', margin: '0 auto' }} />
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

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content className={classes.content} />
      </RichTextEditor>
      <PostTags tag={tag} setTag={setTag} tags={tags} setTags={setTags} />
      <div className={styles.buttonContainer}>
        <button
          className={
            sendingInProgress ? `${styles.publish} ${styles.disabledButton}` : `${styles.publish}`
          }
          onClick={sendPost}
          disabled={sendingInProgress}
        >
          Publish
        </button>
        <button
          className={
            sendingInProgress ? `${styles.cancel} ${styles.disabledButton}` : `${styles.cancel}`
          }
          disabled={sendingInProgress}
          onClick={saveDraft}
        >
          Save as Draft
        </button>
      </div>
    </section>
  );
};

export default PostCreator;
