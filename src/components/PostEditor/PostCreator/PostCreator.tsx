'use client'

import { useState } from 'react';

import ContentEditor from '../ContentEditor/ContentEditor';
import styles from './postCreator.module.scss';
import PostHeader from '../PostHeader/PostHeader';
import PostTags from '../PostTags/PostTags';

const PostCreator = ():JSX.Element => {
  
  const [photo, setPhoto] = useState('');
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState<Array<string>>([]);

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
      <ContentEditor />
      <PostTags tag={tag} setTag={setTag} tags={tags} setTags={setTags}/>
      <div className={styles.buttonContainer}>
        <button className={styles.publish}>Publish</button>
        <button className={styles.cancel}>Cancel</button>
      </div>
    </section>
  )
}

export default PostCreator;
