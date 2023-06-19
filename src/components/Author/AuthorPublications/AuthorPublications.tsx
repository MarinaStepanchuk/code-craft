'use client';

import Preloader from '@/components/Preloader/Preloader';
import Publications from '@/components/Publications/Publications/Publications';
import { useGetUserPostsQuery } from '@/redux/services/postsApi';

const AuthorPublications = ({ authorId }: { authorId: string }): JSX.Element => {
  const defaultValue = {
    posts: [],
    page: 0,
    amountPages: 0,
    amountPosts: 0,
  };
  const { data: publications = defaultValue, isLoading: isLoadingPublished } = useGetUserPostsQuery(
    { userId: authorId, status: 'published' }
  );

  if (isLoadingPublished) {
    return <Preloader width="5rem" height="5rem" color="#05386b" />;
  }

  return <Publications status="draft" posts={publications.posts} isPublic={true} />;
};

export default AuthorPublications;
