import PostCreator from "@/components/PostEditor/PostCreator/PostCreator";
import styles from './page.module.scss';

const NewPost = (): JSX.Element => (
  <div className={styles.pageContainer}>
    <PostCreator />
  </div>
)

export default NewPost;