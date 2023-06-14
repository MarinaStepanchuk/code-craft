import PostCreator from '@/components/PostEditor/PostCreator/PostCreator';
import styles from './page.module.scss';

const NewPost = async (): Promise<JSX.Element> => (
  <div className={styles.pageContainer}>
    <PostCreator type="create" />
  </div>
);

export default NewPost;
