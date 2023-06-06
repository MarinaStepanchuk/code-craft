// import styles from './home.module.scss';

import AllPostsList from '@/components/AllPosts/AllPostsList/PostsList';
import GreetingSection from '@/components/GreetingSection/GreetingSection';
import { IPostWithUser } from '@/types/interfaces';

export const getAllPosts = async (): Promise<IPostWithUser[] | null> => {
  try {
    const response = await fetch(`${process.env.API_URL}/posts`, {
      cache: 'no-cache',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};

const Home = async (): Promise<JSX.Element> => {
  const cards = await getAllPosts();

  if (!cards) {
    return <p>error</p>;
  }

  return (
    <>
      <GreetingSection />
      <AllPostsList cards={cards} />
    </>
  );
};

export default Home;
