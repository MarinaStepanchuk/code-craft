// import styles from './home.module.scss';

import AllPostsList from '@/components/AllPosts/AllPostsList/PostsList';
import Aside from '@/components/Aside/Aside';
import GreetingSection from '@/components/GreetingSection/GreetingSection';
import styles from './home.module.scss';

const Home = async (): Promise<JSX.Element> => {
  try {
    const response = await fetch(`${process.env.API_URL}/posts`, {
      cache: 'no-cache',
    });
    const cards = await response.json();

    return (
      <>
        <GreetingSection />
        <div className={styles.postsContainer}>
          <AllPostsList cards={cards || []} />
          <Aside />
        </div>
      </>
    );
  } catch (error) {
    return (
      <>
        <GreetingSection />
        <div className={styles.postsContainer}>
          <AllPostsList cards={[]} />
          <Aside />
        </div>
      </>
    );
  }
};

export default Home;
