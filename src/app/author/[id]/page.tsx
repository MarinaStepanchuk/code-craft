import AllPostsList from '@/components/AllPosts/AllPostsList/PostsList';
import Aside from '@/components/Aside/Aside';
import AuthorBio from '@/components/AuthorBio/AuthorBio';
import { IPost, IUser } from '@/types/interfaces';
import { notFound } from 'next/navigation';
import styles from './author.module.scss';

interface IPageProps {
  params: { id: string };
}

export default async function EditPostPage({ params: { id } }: IPageProps): Promise<JSX.Element> {
  try {
    const responseUser = await fetch(`${process.env.API_URL}/user/${id}`);
    const user: IUser = await responseUser.json();
    const responsePosts = await fetch(`${process.env.API_URL}/posts?userId=${id}&status=published`);
    const posts: IPost[] = await responsePosts.json();

    if (!user || !posts) {
      notFound();
    }

    const postsWithUser = posts.map((post) => ({ ...post, user }));

    return (
      <div className={styles.mainContainer}>
        <div className={styles.userContainer}>
          <AuthorBio user={user} postsCount={posts.length} />
          <AllPostsList cards={postsWithUser} width={'100%'} />
        </div>
        <Aside />
      </div>
    );
  } catch (error) {
    notFound();
  }
}
