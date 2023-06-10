import ExpandedPost from '@/components/ExpandedPost/ExpandedPost';
import { IExpandedPost } from '@/types/interfaces';

interface IPageProps {
  params: { id: string };
}

export const getPost = async (id: string): Promise<IExpandedPost | null> => {
  try {
    const response = await fetch(`${process.env.API_URL}/post/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};

export default async function EditPostPage({ params: { id } }: IPageProps): Promise<JSX.Element> {
  const data = await getPost(id);

  if (!data) {
    return <p>error</p>;
  }

  return (
    <div>
      <ExpandedPost data={data} />
    </div>
  );
}
