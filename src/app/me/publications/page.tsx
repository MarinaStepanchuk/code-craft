import PublicationsNavigation from '@/components/Publications/PostsNavigation/PublicationsNavigation';
import styles from './page.module.scss';

const Publications = async (): Promise<JSX.Element> => (
  <>
    <h2 className={styles.title}>My posts</h2>
    <PublicationsNavigation />
  </>
);

export default Publications;
