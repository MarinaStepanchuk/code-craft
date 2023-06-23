import Aside from '@/components/Aside/Aside';
import AuthorBio from '@/components/Author/AuthorBio/AuthorBio';
import { IFullUser } from '@/types/interfaces';
import { notFound } from 'next/navigation';
import AuthorPublications from '@/components/Author/AuthorPublications/AuthorPublications';
import { Metadata } from 'next/types';
import { baseUrl, rootMetadata } from '@/constants/common.constants';
import ProgressBarProvider from '@/providers/progressBar';
import styles from './author.module.scss';

interface IPageProps {
  params: { id: string };
}

export const generateMetadata = async ({ params: { id } }: IPageProps): Promise<Metadata> => {
  const responseUser = await fetch(`${process.env.API_URL}/user/${id}`, { cache: 'reload' });
  const user: IFullUser = await responseUser.json();
  return {
    ...rootMetadata,
    title: user.name || user.email,
    description: user.bio || 'Reader and author on the Code Craft website',
    openGraph: {
      url: `${baseUrl}author/${user.id}`,
      images: [
        `${
          user.avatarUrl ||
          'https://firebasestorage.googleapis.com/v0/b/code-craft-app.appspot.com/o/images%2Fscale_1200.webp?alt=media&token=7c580b37-2c68-475f-a0a8-b6851750f9b6'
        }`,
      ],
      title: user.name || user.email,
      description: user.bio || 'Reader and author on the Code Craft website',
    },
    twitter: {
      title: user.name || user.email,
      description: user.bio || 'Reader and author on the Code Craft website',
      images: [
        `${
          user.avatarUrl ||
          'https://firebasestorage.googleapis.com/v0/b/code-craft-app.appspot.com/o/images%2Fscale_1200.webp?alt=media&token=7c580b37-2c68-475f-a0a8-b6851750f9b6'
        }`,
      ],
    },
  };
};

export default async function EditPostPage({ params: { id } }: IPageProps): Promise<JSX.Element> {
  try {
    const responseUser = await fetch(`${process.env.API_URL}/user/${id}`, { cache: 'reload' });
    const user: IFullUser = await responseUser.json();

    if (!user) {
      notFound();
    }

    return (
      <ProgressBarProvider>
        <div className={styles.mainContainer}>
          <div className={styles.userContainer}>
            <AuthorBio userId={user.id} postsCount={user.countPosts} />
            <AuthorPublications authorId={id} />
          </div>
          <Aside />
        </div>
      </ProgressBarProvider>
    );
  } catch (error) {
    notFound();
  }
}
