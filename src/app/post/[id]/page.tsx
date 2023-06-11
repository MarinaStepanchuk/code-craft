import ExpandedPost from '@/components/ExpandedPost/ExpandedPost';
import { notFound } from 'next/navigation';

interface IPageProps {
  params: { id: string };
}

export default async function EditPostPage({ params: { id } }: IPageProps): Promise<JSX.Element> {
  try {
    const response = await fetch(`${process.env.API_URL}/post/${id}`);
    const data = await response.json();

    if (!data) {
      notFound();
    }

    return (
      <div>
        <ExpandedPost data={data} />
      </div>
    );
  } catch (error) {
    notFound();
  }
}
