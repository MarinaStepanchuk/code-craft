'use client';

import { useEffect, useState } from 'react';
import { Divider } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import tsLanguageSyntax from 'highlight.js/lib/languages/typescript';
import { ErrorMessages, Patch } from '@/constants/common.constants';
import {
  useCreatePostMutation,
  useRemoveUnusedImagesMutation,
  useUpdatePostMutation,
} from '@/redux/services/postsApi';
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
import Link from '@tiptap/extension-link';
import PostTags from '../PostTags/PostTags';
import PostHeader from '../PostHeader/PostHeader';
import styles from './postCreator.module.scss';
import PostContentCreator from '../PostContentCreator/PostContentCreator';

lowlight.registerLanguage('ts', tsLanguageSyntax);

interface IPostCreatorProps {
  initialBanner?: string;
  initialTitle?: string;
  initialContent?: string;
  initialTags?: string[];
  type: 'edit' | 'create';
  postId?: string;
}

const PostCreator = ({
  initialBanner = '',
  initialTitle = '',
  initialContent = '',
  initialTags = [],
  type,
  postId,
}: IPostCreatorProps): JSX.Element => {
  const [banner, setBanner] = useState<string | File>(initialBanner);
  const [title, setTitle] = useState(initialTitle);
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState<Array<string>>(initialTags);
  const [images, setImages] = useState<Array<string>>([]);
  const [removeUnusedImages] = useRemoveUnusedImagesMutation();
  const [createPost, resultCreatePost] = useCreatePostMutation();
  const [updatePost, resultUpdatePost] = useUpdatePostMutation();
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
    content: initialContent,
  });

  useEffect(() => {
    const { isError, data } = type === 'edit' ? resultUpdatePost : resultCreatePost;

    if (isError) {
      notifications.show({
        message: ErrorMessages.errorPostLoading,
        color: 'red',
        autoClose: 2000,
        withBorder: true,
        styles: () => ({
          description: { fontSize: '1.4rem' },
        }),
      });
    }

    if (data) {
      push(`${Patch.me}${Patch.publications}`);
    }
  }, [resultCreatePost, resultUpdatePost]);

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

  const publishPost = async (): Promise<void> => {
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
      setSendingInProgress(false);
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
    form.append('title', title);
    form.append('content', contentPost as string);
    form.append('tags', JSON.stringify(tags));
    form.append('status', 'published');

    if (typeof banner === 'string') form.append('banner', banner);
    if (banner && typeof banner !== 'string') form.append('banner', banner as unknown as Blob);

    if (type === 'create') {
      form.append('creatorId', user.id);
      await createPost(form);
    } else {
      form.append('id', postId as string);
      await updatePost(form);
    }

    setSendingInProgress(false);
  };

  const saveDraft = async (): Promise<void> => {
    setSendingInProgress(true);
    const contentPost = editor?.getHTML();

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
    form.append('title', title);
    form.append('content', contentPost || '');
    form.append('tags', tags ? JSON.stringify(tags) : '');
    form.append('status', 'draft');

    if (typeof banner === 'string') form.append('banner', banner);
    if (banner && typeof banner !== 'string') form.append('banner', banner as unknown as Blob);

    if (type === 'create') {
      form.append('creatorId', user.id);
      await createPost(form);
    } else {
      form.append('id', postId as string);
      await updatePost(form);
    }

    setSendingInProgress(false);
  };

  return (
    <section className={styles.creator}>
      <PostHeader
        setBanner={setBanner}
        title={title}
        setTitle={setTitle}
        initialBanner={initialBanner}
      />
      <Divider size={10} sx={{ width: '30%', margin: '0 auto' }} />
      <PostContentCreator editor={editor} images={images} setImages={setImages} />
      <PostTags tag={tag} setTag={setTag} tags={tags} setTags={setTags} />
      <div className={styles.buttonContainer}>
        <button
          className={
            sendingInProgress ? `${styles.publish} ${styles.disabledButton}` : `${styles.publish}`
          }
          onClick={publishPost}
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
