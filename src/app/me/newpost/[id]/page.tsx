import PostCreator from '@/components/PostEditor/PostCreator/PostCreator';
import { rootMetadata } from '@/constants/common.constants';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProgressBarProvider from '@/providers/progressBar';

interface IPageProps {
  params: { id: string };
}

export const metadata: Metadata = { ...rootMetadata, title: 'Edit Post' };

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
      <ProgressBarProvider>
        <PostCreator
          initialBanner={banner || ''}
          initialTitle={title || ''}
          initialContent={content || ''}
          initialTags={tags || []}
          type={'edit'}
          postId={id}
        />
      </ProgressBarProvider>
    );
  } catch (error) {
    notFound();
  }
};

export default EditPostPage;
