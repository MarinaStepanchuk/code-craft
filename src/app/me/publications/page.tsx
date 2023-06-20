import PublicationsNavigation from '@/components/Publications/PostsNavigation/PublicationsNavigation';
import { rootMetadata } from '@/constants/common.constants';
import { Metadata } from 'next/types';
import styles from './page.module.scss';

export const metadata: Metadata = { ...rootMetadata, title: 'My Publications' };

const Publications = async (): Promise<JSX.Element> => (
  <>
    <h2 className={styles.title}>My posts</h2>
    <PublicationsNavigation />
  </>
);

export default Publications;
