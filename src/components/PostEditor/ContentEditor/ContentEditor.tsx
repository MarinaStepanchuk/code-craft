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
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { lowlight } from 'lowlight';
import tsLanguageSyntax from 'highlight.js/lib/languages/typescript';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useSaveImageForPostMutation } from '@/redux/services/postsApi';
import { ErrorMessages } from '@/constants/common.constants'
import { createStyles } from '@mantine/core';
import styles from './contentEditor.module.scss';

lowlight.registerLanguage('ts', tsLanguageSyntax);

const content = '<h2 style="text-align: center;">Welcome to Mantine rich text editor</h2><p><code>RichTextEditor</code> component focuses on usability and is designed to be as simple as possible to bring a familiar editing experience to regular users. <code>RichTextEditor</code> is based on <a href="https://tiptap.dev/" rel="noopener noreferrer" target="_blank">Tiptap.dev</a> and supports all of its features:</p><ul><li>General text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike-through</s> </li><li>Headings (h1-h6)</li><li>Sub and super scripts (<sup>&lt;sup /&gt;</sup> and <sub>&lt;sub /&gt;</sub> tags)</li><li>Ordered and bullet lists</li><li>Text align&nbsp;</li><li>And all <a href="https://tiptap.dev/extensions" target="_blank" rel="noopener noreferrer">other extensions</a></li></ul>';

interface IContentEditor {
  setErrorMessage: Dispatch<SetStateAction<string>>;
  setActiveSnackBar: Dispatch<SetStateAction<boolean>>
}

const useStyles = createStyles((theme) => ({
  toolbar: {
    border: 'none',
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
  postImage: {
    maxWidth: '200px'
  }
}))

const ContentEditor = ({setErrorMessage, setActiveSnackBar}: IContentEditor):JSX.Element => {
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
            style: 'max-width: 90%; display: block; margin: 1rem auto',
          },
        }),
        Highlight,
        TextAlign.configure({ types: ['heading', 'paragraph'] }),
        Placeholder.configure({ placeholder: 'Start your post' }),
        CodeBlockLowlight.configure({
        lowlight}),
      ],
      content,
    });

    const [saveImageForPost, result] = useSaveImageForPostMutation();

    const [image, setImage] = useState('');
  

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
        editor?.chain().focus().setImage({ src: data }).run()
      } 
    }, [result])
  
    return (
      <RichTextEditor editor={editor} sx={{width: '100%', fontSize: '1.4rem'}}>
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
            <label>
              <input 
                type="file"
                value={image}
                accept={'.jpg,.jpeg,.png, .webp'}
                onChange={(e):Promise<void> => saveImage(e)}
                title='add image' 
            />
            </label>
          </RichTextEditor.ControlsGroup>
  
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>
  
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>
  
        <RichTextEditor.Content sx={{backgroundColor: 'inherit', fontSize: '1.6rem'}} />
      </RichTextEditor>
  )
}

export default ContentEditor;