import PostCreator from '@/components/PostEditor/PostCreator/PostCreator';
import { rootMetadata } from '@/constants/common.constants';
import { Metadata } from 'next/types';
import styles from './page.module.scss';

export const metadata: Metadata = { ...rootMetadata, title: 'New Post' };

const NewPost = async (): Promise<JSX.Element> => (
  <div className={styles.pageContainer}>
    <PostCreator type="create" />
  </div>
);

export default NewPost;
