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

lowlight.registerLanguage('ts', tsLanguageSyntax);

const useStyles = createStyles(() => ({
  root: {
    width: '100%',
  },
  content: {
    width: 'content',
    display: 'flex',
    backgroundColor: 'inherit',
    fontSize: '1.8rem',
    wordBreak: 'break-word',

    a: {
      cursor: 'pointer',
    },

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

const PostContentRead = ({ content }: { content: string }): JSX.Element => {
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
    content,
    editable: false,
  });

  return (
    <RichTextEditor editor={editor} className={classes.root}>
      <RichTextEditor.Content className={classes.content} />
    </RichTextEditor>
  );
};

export default PostContentRead;
