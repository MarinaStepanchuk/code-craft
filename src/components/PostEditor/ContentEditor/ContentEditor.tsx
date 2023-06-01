'use client'

import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { lowlight } from 'lowlight';
import tsLanguageSyntax from 'highlight.js/lib/languages/typescript';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useSaveImageForPostMutation } from '@/redux/services/postsApi';
import { ErrorMessages } from '@/constants/common.constants'
import { createStyles } from '@mantine/core';
import { IconPhotoPlus } from '@tabler/icons-react';
import styles from './contentEditor.module.scss';
import YoutubeButton from '../YoutubeButton/YoutubeButton';

lowlight.registerLanguage('ts', tsLanguageSyntax);

const content = '<h2 style="text-align: center;">Welcome to Mantine rich text editor</h2><p><code>RichTextEditor</code> component focuses on usability and is designed to be as simple as possible to bring a familiar editing experience to regular users. <code>RichTextEditor</code> is based on <a href="https://tiptap.dev/" rel="noopener noreferrer" target="_blank">Tiptap.dev</a> and supports all of its features:</p><ul><li>General text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike-through</s> </li><li>Headings (h1-h6)</li><li>Sub and super scripts (<sup>&lt;sup /&gt;</sup> and <sub>&lt;sub /&gt;</sub> tags)</li><li>Ordered and bullet lists</li><li>Text align&nbsp;</li><li>And all <a href="https://tiptap.dev/extensions" target="_blank" rel="noopener noreferrer">other extensions</a></li></ul>';

interface IContentEditorProps {
  setErrorMessage: Dispatch<SetStateAction<string>>;
  setActiveSnackBar: Dispatch<SetStateAction<boolean>>;
  images: Array<string>;
  setImages: Dispatch<SetStateAction<string[]>>;
  setContentPost: Dispatch<SetStateAction<string>>
}

const useStyles = createStyles((theme) => ({
  toolbar: {
    border: 'none',
    width: '100%',
    'button': {
      width: '2rem',
      height: '2rem',

      '&[data-active]': {
        backgroundColor: theme.colors.brand[3],
        color: '#fff',
      },
  
      'svg': {
        width: '1.7rem',
        height: '1.7rem',
        strokeWidth: '1.2'
      }
    }
  },
  content: {
    width: 'content',
    display: 'flex',
    backgroundColor: 'inherit',
    fontSize: '1.6rem',
  
    '& p': {
      color: 'silver',
    },
    'img': {
      maxWidth: '90%',
      display: 'block',
      margin: '1rem auto'
    },
    '& [data-youtube-video]': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 0,
      width: '100%'
    },
    'iframe': {
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
    'hr': {
      width: '20%',
      textAlign: 'center',
    },
    'pre': {
      color: '#fff',
      backgroundColor: '#000',

      'code': {
        fontSize: '1.4rem',
        fontFamily: 'source-code-pro,Menlo,Monaco,"Courier New",Courier,monospace'
      }
    },
    
  },
}))

const ContentEditor = ({setErrorMessage, setActiveSnackBar, images, setImages, setContentPost}: IContentEditorProps):JSX.Element => {
  const { classes } = useStyles();
  const [saveImageForPost, result] = useSaveImageForPostMutation();
  const [image, setImage] = useState('');
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Image.configure({
        HTMLAttributes: {
          alt: 'post image'
        }
      }),
      Highlight,
      Youtube.configure({
        progressBarColor: 'white',
      }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder: 'Start your post' }),
      CodeBlockLowlight.configure({
      lowlight}),
    ],
    content,
  });

  const saveImage = async (e: ChangeEvent<HTMLInputElement>):Promise<void> => {
    setImage(e.target.value)
    const file = e.currentTarget.files as unknown as FileList;
    const form = new FormData();
    form.append('image', file[0] as unknown as Blob);
    await saveImageForPost(form);
  }

  useEffect(() => {
    const { isError, data } = result;
  
    if(isError){
      setErrorMessage(ErrorMessages.errorLoadingImage);
      setActiveSnackBar(true);
    }

    if(data) {
      editor?.chain().focus().setImage({ src: data }).run();
      setImages([...images, data]);
    }
  }, [result])

  useEffect(() => {
    setContentPost(editor?.getHTML() || '');
    console.log(editor?.getHTML())
  }, [editor])
  
  return (
      <RichTextEditor editor={editor}>
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
            <label className={styles.labelImage} title='add image'>
              <IconPhotoPlus size={15} strokeWidth="1.2" />
              <input 
                type="file"
                value={image}
                accept={'.jpg,.jpeg,.png, .webp'}
                onChange={(e):Promise<void> => saveImage(e)} 
            />
            </label>
            <YoutubeButton editor={editor}/>
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
  )
}

export default ContentEditor;