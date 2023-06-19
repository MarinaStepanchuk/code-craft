import PostCreator from '@/components/PostEditor/PostCreator/PostCreator';
import { notFound } from 'next/navigation';

interface IPageProps {
  params: { id: string };
}

// eslint-disable-next-line consistent-return
const EditPostPage = async ({ params: { id } }: IPageProps): Promise<JSX.Element> => {
  try {
    const response = await fetch(`${process.env.API_URL}/post/draft/${id}`);
    const post = await response.json();
    const { banner, title, content, tags } = post;

    if (!post) {
      notFound();
    }

    return (
      <PostCreator
        initialBanner={banner || ''}
        initialTitle={title || ''}
        initialContent={content || ''}
        initialTags={tags || []}
        type={'edit'}
        postId={id}
      />
    );
  } catch (error) {
    notFound();
  }
};

export default EditPostPage;
