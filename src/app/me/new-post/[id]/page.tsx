import PostCreator from '@/components/PostEditor/PostCreator/PostCreator';
import { IPost } from '@/types/interfaces';

interface IPageProps {
  params: { id: string };
}

export const getPost = async (id: string): Promise<IPost | null> => {
  try {
    const response = await fetch(`${process.env.API_URL}/post/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};

export default async function EditPostPage({ params: { id } }: IPageProps): Promise<JSX.Element> {
  const post = await getPost(id);

  if (!post) {
    return <p>error</p>;
  }

  const { banner, title, content, Tags } = post;

  return (
    <PostCreator
      initialBanner={banner || ''}
      initialTitle={title || ''}
      initialContent={content || ''}
      initialTags={Tags || []}
      type={'edit'}
      postId={id}
    />
  );
}
