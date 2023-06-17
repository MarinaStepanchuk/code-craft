import AllPostsList from '@/components/AllPosts/AllPostsList/PostsList';
import Aside from '@/components/Aside/Aside';
import AuthorBio from '@/components/AuthorBio/AuthorBio';
import { IPost, IFullUser } from '@/types/interfaces';
import { notFound } from 'next/navigation';
import styles from './author.module.scss';

interface IPageProps {
  params: { id: string };
}

export default async function EditPostPage({ params: { id } }: IPageProps): Promise<JSX.Element> {
  try {
    const responseUser = await fetch(`${process.env.API_URL}/user/${id}`);
    const user: IFullUser = await responseUser.json();

    if (!user) {
      notFound();
    }

    return (
      <div className={styles.mainContainer}>
        <div className={styles.userContainer}>
          <AuthorBio user={user} postsCount={user.countPosts} />
          <AllPostsList width={'100%'} />
        </div>
        <Aside />
      </div>
    );
  } catch (error) {
    notFound();
  }
}
