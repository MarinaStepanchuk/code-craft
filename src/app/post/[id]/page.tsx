import ExpandedPost from '@/components/ExpandedPost/ExpandedPost';
import { baseUrl } from '@/constants/common.constants';
import { IPostWithUser } from '@/types/interfaces';
import getFirstParagraph from '@/utils/getFirstParagraph';
import { notFound } from 'next/navigation';
import { Metadata } from 'next/types';
import ProgressBarProvider from '@/providers/progressBar';

interface IPageProps {
  params: { id: string };
}

export const generateMetadata = async ({ params: { id } }: IPageProps): Promise<Metadata> => {
  const response = await fetch(`${process.env.API_URL}/post/${id}`, {
    cache: 'no-cache',
  });
  const post: IPostWithUser = await response.json();
  const description = `${getFirstParagraph(post.content as string).slice(0, 200)}...`;
  return {
    title: post.title as string,
    description,
    keywords: `${post.tags?.join(
      ' '
    )} programming software development coding web development mobile development computer science programming languages algorithms data structures software engineering object-oriented programming agile methodology front-end development back-end development devops cloud computing machine learning artificial intelligence cybersecurity blockchain technology internet of things user experience user interface responsive design software testing, version control debugging continuous integration open source`,
    openGraph: {
      url: `${baseUrl}post/${id}`,
      images: [post.banner as string],
      title: post.title as string,
      description,
    },
    twitter: {
      title: post.title as string,
      description,
      images: [post.banner as string],
    },
  };
};

export default async function EditPostPage({ params: { id } }: IPageProps): Promise<JSX.Element> {
  try {
    const response = await fetch(`${process.env.API_URL}/post/${id}`, {
      cache: 'no-cache',
    });
    const data = await response.json();

    if (!data) {
      notFound();
    }

    return (
      <ProgressBarProvider>
        <ExpandedPost data={data} />
      </ProgressBarProvider>
    );
  } catch (error) {
    notFound();
  }
}
