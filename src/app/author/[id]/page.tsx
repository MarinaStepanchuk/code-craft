import AllPostsList from '@/components/AllPosts/AllPostsList/PostsList';
import AuthorBio from '@/components/AuthorBio/AuthorBio';
import { IPost, IUser } from '@/types/interfaces';

interface IPageProps {
  params: { id: string };
}

export const getPost = async (id: string): Promise<{ user: IUser; posts: IPost[] } | null> => {
  try {
    const responseUser = await fetch(`${process.env.API_URL}/user/${id}`);
    const user = await responseUser.json();
    const responsePosts = await fetch(`${process.env.API_URL}/posts?userId=${id}&status=published`);
    const posts = await responsePosts.json();
    return {
      user,
      posts,
    };
  } catch (error) {
    return null;
  }
};

export default async function EditPostPage({ params: { id } }: IPageProps): Promise<JSX.Element> {
  const data = await getPost(id);

  if (!data) {
    return <p>error</p>;
  }

  const { user, posts } = data;

  const postsWithUser = posts.map((post) => ({ ...post, user }));

  return (
    <div>
      <AuthorBio user={user} />
      <AllPostsList cards={postsWithUser} width={'100%'} />
    </div>
  );
}
