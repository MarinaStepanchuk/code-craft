import ExpandedPost from '@/components/ExpandedPost/ExpandedPost';
import { IExpandedPost } from '@/types/interfaces';
import { notFound } from 'next/navigation';

interface IPageProps {
  params: { id: string };
}

const getPost = async (id: string): Promise<IExpandedPost> => {
  const response = await fetch(`${process.env.API_URL}/post/${id}`);
  const data = await response.json();

  return data;
};

export default async function EditPostPage({ params: { id } }: IPageProps): Promise<JSX.Element> {
  try {
    const data = await getPost(id);

    if (!data) {
      notFound();
    }

    return <ExpandedPost data={data} />;
  } catch (error) {
    notFound();
  }
}
