import AllPostsList from '@/components/AllPosts/AllPostsList/PostsList';
import Aside from '@/components/Aside/Aside';
import GreetingSection from '@/components/GreetingSection/GreetingSection';
import styles from './home.module.scss';

const Home = async (): Promise<JSX.Element> => (
  <>
    <GreetingSection />
    <div className={styles.postsContainer}>
      <AllPostsList />
      <Aside />
    </div>
  </>
);

export default Home;
