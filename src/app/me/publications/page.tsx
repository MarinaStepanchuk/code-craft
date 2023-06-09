import PublicationsNavigation from '@/components/Publications/PostsNavigation/PublicationsNavigation';
import { rootMetadata } from '@/constants/common.constants';
import { Metadata } from 'next/types';
import ProgressBarProvider from '@/providers/progressBar';
import styles from './page.module.scss';

export const metadata: Metadata = { ...rootMetadata, title: 'My Publications' };

const Publications = async (): Promise<JSX.Element> => (
  <>
    <ProgressBarProvider>
      <h2 className={styles.title}>My posts</h2>
      <PublicationsNavigation />
    </ProgressBarProvider>
  </>
);

export default Publications;
