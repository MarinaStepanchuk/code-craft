'use client';

import { createStyles } from '@mantine/core';
import tsLanguageSyntax from 'highlight.js/lib/languages/typescript';
import { RichTextEditor, Link } from '@mantine/tiptap';
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
import { IPost } from '@/types/interfaces';

lowlight.registerLanguage('ts', tsLanguageSyntax);

const useStyles = createStyles(() => ({
  root: {
    width: '100%',
    border: 'none',
    borderBottom: '0.0625rem solid #ced4da',
  },
  content: {
    width: 'content',
    display: 'flex',
    backgroundColor: 'none',
    fontSize: '1.8rem',
    wordBreak: 'break-word',
    padding: '2rem',

    a: {
      cursor: 'pointer',
      color: '#212832',
    },

    '& p': {
      color: '#4a4a4a',
      lineHeight: '1.8',
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
    div: {
      pre: {
        backgroundColor: '#302f2f',
        padding: '1rem',

        code: {
          width: '100%',
          fontSize: '1.6rem',
          fontFamily: 'source-code-pro,Menlo,Monaco,"Courier New",Courier,monospace',
          color: '#fff',
          backgroundColor: '#302f2f',
        },
      },
    },
    code: {
      width: '100%',
      fontSize: '1.6rem',
      fontFamily: 'source-code-pro,Menlo,Monaco,"Courier New",Courier,monospace',
      color: '#fff',
      backgroundColor: '#302f2f',
    },
    strong: {
      fontWeight: 800,
    },
    h2: {
      fontSize: '2.5rem',
    },
  },
}));

const PostContentRead = ({ data }: { data: IPost }): JSX.Element => {
  const { classes } = useStyles();

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
    content: data.content,
    editable: false,
  });

  return (
    <RichTextEditor editor={editor} className={classes.root}>
      {data.content && <RichTextEditor.Content className={classes.content} />}
    </RichTextEditor>
  );
};

export default PostContentRead;
