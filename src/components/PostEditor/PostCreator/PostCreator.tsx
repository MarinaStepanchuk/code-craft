'use client'

import { useState } from 'react';

import SnackBar from '@/components/SnackBar/SnackBar';
import ContentEditor from '../ContentEditor/ContentEditor';
import styles from './postCreator.module.scss';
import PostHeader from '../PostHeader/PostHeader';
import PostTags from '../PostTags/PostTags';

const PostCreator = ():JSX.Element => {
  
  const [photo, setPhoto] = useState('');
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState<Array<string>>([]);
  const [ errorMessage, setErrorMessage ] = useState('');
  const [activeSnackBar, setActiveSnackBar] = useState(false);

  return (
    <section className={styles.creator}>
      <PostHeader photo={photo} setPhoto={setPhoto} title={title} setTitle={setTitle}  />
      <div className={styles.divider}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <ContentEditor setErrorMessage={setErrorMessage} setActiveSnackBar={setActiveSnackBar}/>
      <PostTags tag={tag} setTag={setTag} tags={tags} setTags={setTags}/>
      <div className={styles.buttonContainer}>
        <button className={styles.publish}>Publish</button>
        <button className={styles.cancel}>Cancel</button>
      </div>
      <SnackBar active={activeSnackBar} setActive={setActiveSnackBar} timer={3000} type='alert'>
          <div>{errorMessage}</div>
      </SnackBar>
    </section>
  )
}

export default PostCreator;
