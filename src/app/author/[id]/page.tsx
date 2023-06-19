import Aside from '@/components/Aside/Aside';
import AuthorBio from '@/components/Author/AuthorBio/AuthorBio';
import { IFullUser } from '@/types/interfaces';
import { notFound } from 'next/navigation';
import AuthorPublications from '@/components/Author/AuthorPublications/AuthorPublications';
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
          <AuthorPublications authorId={id} />
        </div>
        <Aside />
      </div>
    );
  } catch (error) {
    notFound();
  }
}
