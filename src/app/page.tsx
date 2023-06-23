import AllPostsList from '@/components/AllPosts/AllPostsList/PostsList';
import Aside from '@/components/Aside/Aside';
import GreetingSection from '@/components/GreetingSection/GreetingSection';
import { Metadata } from 'next/types';
import { rootMetadata } from '@/constants/common.constants';
import ProgressBarProvider from '@/providers/progressBar';
import styles from './home.module.scss';

export const metadata: Metadata = rootMetadata;

const Home = async (): Promise<JSX.Element> => (
  <>
    <ProgressBarProvider>
      <GreetingSection />
      <div className={styles.postsContainer}>
        <AllPostsList />
        <Aside />
      </div>
    </ProgressBarProvider>
  </>
);

export default Home;
